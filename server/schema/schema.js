const { gql } = require('apollo-server');

const typeDefs = gql`

input UserInput{
    id:String!
    name:String!
}

type User{
    id:String!
    name:String!
    password:String!
    gameLobby: String!
    avatar: String!
    isPlaying: Boolean!
    isOnline: Boolean!
}

type Room{
    id:String!
    gameId: String!
    name: String!
    owner: User!
    isOpen: Boolean!
    players: [User!]!
}

type Process{
    id:String!
    processStatus: Int!
    owner: User!
    roomId:String!
    players: [User!]!
    processContent:String!
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
    owner:User!
    roomId:String!
}

type AuthPayload {
    token: String!
    refreshToken: String!
}

type Query{
    user (id: ID!): User
    getOnlineUsers:[User!]!
    getGames: [Game!]!
    getGameByName(originalName:String!):Game!
    getMessages(roomId:String!): [Message!]!
    getRoomById(id:String!):Room!
    getRoomsByGameId(gameId:String!):[Room!]!
}

type Mutation{
    register(name: String!, password: String!, avatar: String!): User!
    login(name:String!, password:String!):AuthPayload!
    changeUserOnlineStatus(userId:String!, status:Boolean!):[User!]!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
    addMessage(text: String!, owner: UserInput!, roomId:String!): Message!
    addRoom(gameId:String!, name:String!, owner:UserInput!): Room!
    updateRoom(id:String!, name:String, players:[UserInput], isOpen:Boolean): Room!
    removeRoomById(id:String!):Room
    addProcess(owner: UserInput!, roomId:String!):Process!
    removeProcessById(id:String!):Process!
}

type Subscription {
    messageAdded: Message!
    roomAdded:Room!
    userActivityChange:[User!]!
}
`

module.exports = typeDefs;