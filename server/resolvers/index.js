
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
        getMessages: async () => await Message.find({}),
        getGames: async () => await Game.find({}),
        getGameByName: async (parent, { originalName }) => await Game.findOne({originalName:originalName}),
        getRoomsByGameId: async (parent, { gameId }) => await Room.find({ gameId }),
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
        addMessage: (root, args, context) => {
            pubsub.publish(MESSAGE_ADDED, { messageAdded: args });

            var msg = new Message();
            msg.text = args.text
            msg.ownerName = args.ownerName
            msg.ownerId = args.ownerId

            return msg.save();
        },
        addRoom: (parent, {gameId, name, ownerId}) => {

            var room = new Room();
            room.id = +new Date() + "_" + "room";
            room.gameId = gameId;
            room.name = name;
            room.ownerId = ownerId;
            room.isOpen = true;
            room.playersIds = [ownerId];
            
            pubsub.publish(ROOM_ADDED, { roomAdded: { id:room.id, gameId:room.gameId, name:room.name, ownerId:room.ownerId, isOpen:room.isOpen, playersIds:room.playersIds } });

            return room.save();
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