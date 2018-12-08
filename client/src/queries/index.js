import { gql } from 'apollo-boost';

const QUERIES = {
    GET_MESSAGES: gql`
    query{
        getMessages{
          text,
          owner
        }
      }`
}

const MUTATIONS = {
    LOGIN_QUERY:gql`
    mutation($name: String!, $password:String!){
        login(name:$name, password: $password){
            token
            refreshToken
        }
    }`,
    REGISTER_QUERY:gql`
    mutation($name: String!, $password:String!){
        register(name:$name, password: $password){
            name
            password
        }
    }`,
    ADD_MESSAGE_QUERY:gql`
    mutation($text: String, $owner:String){
        addMessage(text:$text, owner: $owner){
            text
            owner
        }
    }`
}

const SUBSCRIPTIONS = {
    ON_ADDED_MSG:  gql`
    subscription{
        messageAdded{
          text,
          owner
        }
      }`
}

export { MUTATIONS, SUBSCRIPTIONS, QUERIES };