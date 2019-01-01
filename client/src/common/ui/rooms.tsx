import * as React from 'react'
import { Query, Mutation } from 'react-apollo';
import { QUERIES, SUBSCRIPTIONS, MUTATIONS } from '../../queries';
import { GameContext } from './lobby';
import { identity } from '../identity';
import { withRouter } from 'react-router';

class RoomsImpl extends React.Component<any, any>{
    
    public render() {
        var unsubscribe: any = null;
        var userInfo = identity.userInfo();

        return <GameContext.Consumer>
            {
                (gameInfo:any) => <Query query={QUERIES.GET_ROOMS_BY_GAME_ID} variables={{gameId:gameInfo.id}}>
                    {
                        ({ loading, error, data, subscribeToMore }) => {

                            if (loading) return null;
                            if (error) return `Error!: ${error}`;
                            if (!unsubscribe) {
                                unsubscribe = subscribeToMore({
                                    document: SUBSCRIPTIONS.ON_ROOM_ADDED,
                                    updateQuery: (prev, { subscriptionData }) => {
                                        if (!subscriptionData.data) return prev;
                                        if (subscriptionData.data.roomAdded.owner.id == userInfo.id) return prev;
                                        if(prev.getRoomsByGameId.filter((x:any)=>x.id == subscriptionData.data.roomAdded.id).length > 0  ) return prev

                                        const roomAdded = subscriptionData.data.roomAdded;
                                        
                                        return {
                                            ...prev,
                                            getRoomsByGameId: [...prev.getRoomsByGameId, roomAdded]
                                        };
                                    }
                                });
                            }

                            return <Mutation mutation={MUTATIONS.UPDATE_ROOM_QUERY}>
                                {
                                    (updateRoom)=>{
                                        return  <table className="table main-table">
                                        <thead>
                                            <tr>
                                                <th colSpan={3}>Активни стаи</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data && data.getRoomsByGameId.map((room: any) => {
                                                    return <tr key={room.id}>
                                                        <td>{room.name}</td>
                                                        <td>{room.players.length}/{gameInfo.maxPlayers}</td>
                                                        <td>{room.isOpen ? <button type="button" className="btn btn-success btn-sm" onClick={()=>{
                                                             updateRoom({ variables: { id: room.id, players: [...room.players, {name:userInfo.name, id:userInfo.id} ], isOpen: room.players.length + 1 < gameInfo.maxPlayers } }).then((room)=>{
                                                                this.props.history.push(this.props.location.pathname+"/"+(room as any).data.updateRoom.id)
                                                            });

                                                        }}>Вход <i className="fa fa-sign-in"></i></button> : null}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                        
                                    </table>
                                    }
                                }
                               
                            </Mutation>
                        }
                    }
                </Query>
            }
        </GameContext.Consumer>
    }
}

export const Rooms = withRouter(RoomsImpl);