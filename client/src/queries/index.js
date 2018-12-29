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
    GET_ROOMS_BY_GAME_ID: gql`
    query($gameId:String!){
        getRoomsByGameId(gameId:$gameId){
            id
            gameId
            name
            ownerId
            isOpen
            playersIds
        }
      }`,
    GET_GAMES: gql`
    query{
        getGames{
            id
            originalName
            translatedName
            shortDescription
            minPlayers
            maxPlayers
            gameRules
            isActive
          }
      }`,
    GET_GAME_BY_NAME: gql`
    query($originalName:String!){
          getGameByName(originalName:$originalName){
              id
              originalName
              translatedName
              shortDescription
              minPlayers
              maxPlayers
              gameRules
              isActive
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
            id
            gameId
            name
            ownerId
            isOpen
            playersIds
        }
      }`
}

export { MUTATIONS, SUBSCRIPTIONS, QUERIES };