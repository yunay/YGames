import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            name
            genre
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!){
        addBook(name: $name, genre: $genre){
            name
            genre
        }
    }
`;


export { getBooksQuery, addBookMutation };