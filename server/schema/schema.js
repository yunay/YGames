const { gql } = require('apollo-server');

const typeDefs = gql`

type User{
    name:String!
    password:String!
    gameLobby: String!
    isPlaying: Boolean!
}

type Room{
    gameId: String!
    name: String!
    ownerId: String!
    isOpen: Boolean!
    playersIds: [String!]!
}

type Game{
    originalName: String!
    translatedName: String!
    shortDescription: String!
    minPlayers: Int!
    maxPlayers: Int!
    gameRules: String!
    isActive: Boolean!
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
    getRoomById:Room!
    getRooms:[Room!]!
}

type Mutation{
    register(name: String!, password: String!): User!
    login(name:String!, password:String!):AuthPayload!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
    addMessage(text: String, ownerName: String, ownerId: String): Message!
    addRoom(gameId:String!, name:String!, ownerId:String!): Room!
}

type Subscription {
    messageAdded: Message!
    roomAdded:Room!
}
`

module.exports = typeDefs;