import { gql } from 'apollo-boost';

const QUERIES = {
    GET_MESSAGES: gql`
    query($roomId:String!){
        getMessages(roomId:$roomId){
          text
          owner{
              id
              name
          }
          roomId
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
    }`,
    GET_ONLINE_USERS: gql`
    query{
        getOnlineUsers{
              id
              name
              isOnline
              avatar
              isPlaying
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
    mutation($name: String!, $password:String!, $avatar:String!){
        register(name:$name, password: $password, avatar: $avatar){
            name
            password
        }
    }`,
    ADD_MESSAGE_QUERY: gql`
    mutation($text: String!, $owner:UserInput!, $roomId:String!){
        addMessage(text:$text, owner: $owner, roomId: $roomId){
            text
            roomId
            owner{
                id
                name
            }
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
    CHANGE_USER_ONLINE_STATUS: gql`
    mutation($userId: String!, $status:Boolean!){
        changeUserOnlineStatus(userId:$userId,status:$status){
            id
        }
    }`,
}

const SUBSCRIPTIONS = {
    ON_ADDED_MSG: gql`
    subscription{
        messageAdded{
          roomId
          text
          owner{
              id
              name
          }
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
      }`,
      ON_USER_ACTIVITY_CHANGE: gql`
      subscription{
        userActivityChange{
            id  
            name
            isOnline
            avatar
            isPlaying
          }
        }`
}

export { MUTATIONS, SUBSCRIPTIONS, QUERIES };