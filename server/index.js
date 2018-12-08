const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { createHttpLink } = require('apollo-link-http');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers');
const serverConfig = require('./server.config');

mongoose.connect(serverConfig.connectionString, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
  
  },
  context: {
    SECRET: serverConfig.secret,
    addUser: async (req, res, next) => {
      const token = req.headers['x-token'];

      if (token) {
        try {
          const { user } = jwt.verify(token, serverConfig.secret);
          req.user = user;
        } catch (err) {
          const refreshToken = req.headers['x-refresh-token'];
          const newTokens = await refreshTokens(
            token,
            refreshToken,
            serverConfig.secret,
          );
          if (newTokens.token && newTokens.refreshToken) {
            res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
            res.set('x-token', newTokens.token);
            res.set('x-refresh-token', newTokens.refreshToken);
          }
          req.user = newTokens.user;
        }
      }
      next();
    }
  }
});

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});