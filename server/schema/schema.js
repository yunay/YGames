const { gql } = require('apollo-server');

const typeDefs = gql`
type Book{
    name:String
    genre: String
}

type User{
    name:String!
    password:String!
}

type AuthPayload {
    token: String!
    refreshToken: String!
}

type Query{
    books:[Book]!
    user (id: ID!): User
}

type Mutation{
    addBook(name:String, genre:String):Book!
    register(name: String!, password: String!): User!
    login(name:String!, password:String!):AuthPayload!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
}
`

module.exports = typeDefs;