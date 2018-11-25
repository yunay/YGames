const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const serverConfig = require('./server.config');

mongoose.connect(serverConfig.connectionString, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});