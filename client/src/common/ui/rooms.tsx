import * as React from 'react'
import { Query } from 'react-apollo';
import { QUERIES, SUBSCRIPTIONS } from '../../queries';
import { GameContext } from './lobby';

export class Rooms extends React.Component<any, any>{

    public render() {
        var unsubscribe: any = null;

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

                                        const roomAdded = subscriptionData.data.roomAdded;

                                        return {
                                            ...prev,
                                            getRoomsByGameId: [...prev.getRoomsByGameId, roomAdded]
                                        };
                                    }
                                });
                            }

                            return <table className="table main-table">
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
                                                <td>{room.playersIds.length}/{gameInfo.maxPlayers}</td>
                                                <td>{room.isOpen ? <button type="button" className="btn btn-success btn-sm">Вход <i className="fa fa-sign-in"></i></button> : null}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    }
                </Query>
            }
        </GameContext.Consumer>
    }
}