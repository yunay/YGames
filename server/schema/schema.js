const { gql } = require('apollo-server');

const typeDefs = gql`

type User{
    name:String!
    password:String!
}

type Message{
    text:String!
    ownerName:String!
    ownerId:String!
}

type AuthPayload {
    token: String!
    refreshToken: String!
}

type Query{
    user (id: ID!): User
    getMessages: [Message!]!
}

type Mutation{
    register(name: String!, password: String!): User!
    login(name:String!, password:String!):AuthPayload!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
    addMessage(text: String, ownerName: String, ownerId: String): Message!
}

type Subscription {
    messageAdded: Message!
}
`

module.exports = typeDefs;