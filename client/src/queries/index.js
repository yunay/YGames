import { gql } from 'apollo-boost';

const QUERIES = {
    GET_MESSAGES: gql`
    query{
        getMessages{
          text,
          ownerId,
          ownerName
        }
      }`,
    GET_ROOMS: gql`
    query{
        getRooms{
            gameId
            name
            ownerId
            isOpen
            playersIds
        }
      }`,
    GET_ROOM_BY_ID: gql`
    query{
        getRoomById{
            gameId
            name
            ownerId
            isOpen
            playersIds
        }
      }`
}

const MUTATIONS = {
    LOGIN_QUERY: gql`
    mutation($name: String!, $password:String!){
        login(name:$name, password: $password){
            token
            refreshToken
        }
    }`,
    REGISTER_QUERY: gql`
    mutation($name: String!, $password:String!){
        register(name:$name, password: $password){
            name
            password
        }
    }`,
    ADD_MESSAGE_QUERY: gql`
    mutation($text: String, $ownerId:String, $ownerName:String){
        addMessage(text:$text, ownerId: $ownerId, ownerName: $ownerName){
            text
            ownerId
            ownerName
        }
    }`
}

const SUBSCRIPTIONS = {
    ON_ADDED_MSG: gql`
    subscription{
        messageAdded{
          text
          ownerName
          ownerId
        }
      }`,
    ON_ROOM_ADDED: gql`
    subscription{
        roomAdded{
            gameId
            name
            ownerId
            isOpen
            playersIds
        }
      }`
}

export { MUTATIONS, SUBSCRIPTIONS, QUERIES };