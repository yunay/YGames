const { gql } = require('apollo-server');

const typeDefs = gql`

type User{
    id:String!
    name:String!
    password:String!
    gameLobby: String!
    isPlaying: Boolean!
}

type Room{
    id:String!
    gameId: String!
    name: String!
    ownerId: String!
    isOpen: Boolean!
    playersIds: [String!]!
}

type Game{
    id:String!
    originalName: String!
    translatedName: String!
    shortDescription: String!
    minPlayers: Int!
    maxPlayers: Int!
    gameRules: String!
    isActive: Boolean!
    playingTime: String!
    adultControl: String!
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
    getGames: [Game!]!
    getGameByName(originalName:String!):Game!
    getMessages: [Message!]!
    getRoomsByGameId(gameId:String!):[Room!]!
}

type Mutation{
    register(name: String!, password: String!): User!
    login(name:String!, password:String!):AuthPayload!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
    addMessage(text: String, ownerName: String, ownerId: String): Message!
    addRoom(gameId:String!, name:String!, ownerId:String!): Room!
    updateRoom(id:String!, name:String, playersIds:[String], isOpen:Boolean): Room!
}

type Subscription {
    messageAdded: Message!
    roomAdded:Room!
}
`

module.exports = typeDefs;