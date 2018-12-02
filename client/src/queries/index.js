import { gql } from 'apollo-boost';

const loginQuery = gql`
    mutation($name: String!, $password:String!){
        login(name:$name, password: $password){
            token
            refreshToken
        }
    }
`;

const registerQuery = gql`
    mutation($name: String!, $password:String!){
        register(name:$name, password: $password){
            name
            password
        }
    }
`;

export { loginQuery, registerQuery };