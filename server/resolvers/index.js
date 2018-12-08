
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Message = require('../models/message');
const { PubSub } = require('apollo-server');
const { refreshTokens, tryLogin } = require('../auth');

const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

module.exports = {
    Query: {
        user: () => User.find({}),
        getMessages: async () => await Message.find({})
    },
    Mutation: {
        register: async (parent, { name, password }) => {
            var user = await User.findOne({ name });

            if (user)
                throw new Error("Username is already used!");
           
            var currentUser = new User();
            currentUser.name = name;
            currentUser.password = await bcrypt.hash(password, 12);

            return currentUser.save();
        },
        login: async (parent, { name, password }, context) => tryLogin(name, password, context),
        refreshTokens: (parent, { token, refreshToken }, context) => refreshTokens(token, refreshToken, context),
        addMessage:(root,args,context)=>{
            pubsub.publish('MESSAGE_ADDED', {messageAdded:args});

            var msg = new Message();
            msg.text = args.text
            msg.owner = args.owner

            return msg.save();
        }
    },
    Subscription:{
        messageAdded:{
            subscribe: async ()=> await pubsub.asyncIterator([MESSAGE_ADDED])
        }
    }
};