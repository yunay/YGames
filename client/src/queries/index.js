import { gql } from 'apollo-boost';

const QUERIES = {
    GET_MESSAGES: gql`
    query{
        getMessages{
          text,
          ownerId,
          ownerName
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
    mutation($text: String, $ownerId:String, $ownerName:String){
        addMessage(text:$text, ownerId: $ownerId, ownerName: $ownerName){
            text
            ownerId
            ownerName
        }
    }`
}

const SUBSCRIPTIONS = {
    ON_ADDED_MSG:  gql`
    subscription{
        messageAdded{
          text
          ownerName
          ownerId
        }
      }`
}

export { MUTATIONS, SUBSCRIPTIONS, QUERIES };