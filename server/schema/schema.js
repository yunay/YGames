const { gql } = require('apollo-server');

const typeDefs = gql`
type Book{
    name:String
    genre: String
}

type Query{
    books:[Book]!
}

type Mutation{
    addBook(name:String, genre:String):Book!
}
`

module.exports = typeDefs;