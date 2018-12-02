
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { refreshTokens, tryLogin } = require('../auth');

module.exports = {
    Query: {
        user: () => User.find({})
    },
    Mutation: {
        register: async (parent, args) => {
            var user = new User();
            user.name = args.name;
            user.password = await bcrypt.hash(args.password, 12);

            return user.save();
        },
        login: async (parent, { name, password }, context) => tryLogin(name, password, context),
        refreshTokens: (parent, { token, refreshToken }, context) => refreshTokens(token, refreshToken, context),
    }
};