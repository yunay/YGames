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
            owner{
                name
                id
            }
            isOpen
            players{
                name
                id
            }
        }
      }`,
    GET_ROOM_BY_ID: gql`
      query($id:String!){
        getRoomById(id:$id){
              name
              owner{
                  id
                  name
              }
              players{
                  name
                  id
              }
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
    }`,
    ADD_ROOM_QUERY: gql`
    mutation($gameId: String!, $name:String!, $owner:UserInput!){
        addRoom(gameId:$gameId, name: $name, owner: $owner){
            id
        }
    }`,
    UPDATE_ROOM_QUERY: gql`
    mutation($id: String!, $name:String, $players:[UserInput], $isOpen:Boolean){
        updateRoom(id:$id, name: $name, players: $players, isOpen:$isOpen){
            id
        }
    }`,
    REMOVE_ROOM_BY_ID: gql`
    mutation($id: String!){
        removeRoomById(id:$id){
            id
        }
    }`,
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
            owner{
                name
                id
            }
            isOpen
            players{
                name
                id
            }
        }
      }`
}

export { MUTATIONS, SUBSCRIPTIONS, QUERIES };