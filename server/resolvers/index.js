
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { refreshTokens, tryLogin } = require('../auth');

module.exports = {
    Query: {
        user: () => User.find({})
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
    }
};