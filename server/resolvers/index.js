
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Message = require('../models/message');
const Game = require('../models/game');
const Room = require('../models/room');
const { PubSub } = require('apollo-server');
const { refreshTokens, tryLogin } = require('../auth');
const serverConfig = require('../server.config');

const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';
const ROOM_ADDED = 'ROOM_ADDED';

module.exports = {
    Query: {
        user: () => User.find({}),
        getMessages: async (parent, { roomId }) => await Message.find({ roomId }),
        getGames: async () => await Game.find({}),
        getGameByName: async (parent, { originalName }) => await Game.findOne({ originalName: originalName }),
        getRoomsByGameId: async (parent, { gameId }) => await Room.find({ gameId }),
        getRoomById: async (parent, { id }) => await Room.findOne({ id })
    },
    Mutation: {
        register: async (parent, { name, password }) => {
            var user = await User.findOne({ name });

            if (user)
                throw new Error("Username is already used!");

            var currentUser = new User();
            currentUser.id = +new Date + "_" + "user"
            currentUser.name = name;
            currentUser.gameLobby = "";
            currentUser.isPlaying = false;
            currentUser.password = await bcrypt.hash(password, 12);

            return currentUser.save();
        },
        login: async (parent, { name, password }, context) => tryLogin(name, password, context),
        refreshTokens: (parent, { token, refreshToken }, context) => refreshTokens(token, refreshToken, context),
        addMessage: async (root, args, context) => {

            var msg = new Message();
            msg.text = args.text;
            msg.ownerName = args.ownerName;
            msg.owner = args.owner;
            msg.roomId = args.roomId;
            
            return new Promise((resolve, reject) => {
                msg.save().then((product) => {
                    pubsub.publish(MESSAGE_ADDED, { messageAdded: product });
                    resolve(product);
                });
            })
        },
        addRoom: (parent, args, context) => {

            var room = new Room();
            room.id = +new Date() + "_" + "room";
            room.gameId = args.gameId;
            room.name = args.name;
            room.owner = { id: args.owner.id, name: args.owner.name };
            room.isOpen = true;
            room.players = [{ id: args.owner.id, name: args.owner.name }];

            return new Promise((resolve, reject) => {
                room.save().then((product) => {
                    pubsub.publish(ROOM_ADDED, { roomAdded: product });
                    resolve(product);
                });
            })
        },
        updateRoom: async (parent, { id, name, players, isOpen }) => {
            var room = await Room.findOne({ id });

            if (room == null || room == undefined)
                throw new Error("Room not found!")

            if (name != null && name != undefined)
                room.name = name;

            if (isOpen != null && isOpen != undefined)
                room.isOpen = isOpen;

            if (players != null && players != undefined)
                room.players = players;

            return new Promise((resolve, reject) => {
                room.save().then((product) => {

                    pubsub.publish(ROOM_ADDED, { roomAdded: product });
                    resolve(product);
                });
            })
        },
        removeRoomById: async (parent, { id }) => {
            await Room.findOneAndDelete({ id })
            await Message.deleteMany({roomId:id})

        } 
    },
    Subscription: {
        messageAdded: {
            subscribe: async () => await pubsub.asyncIterator([MESSAGE_ADDED])
        },
        roomAdded: {
            subscribe: async () => await pubsub.asyncIterator([ROOM_ADDED])
        },
    }
};