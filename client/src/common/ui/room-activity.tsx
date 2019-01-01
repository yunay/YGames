import * as React from 'react'
import { Query } from 'react-apollo';
import { QUERIES } from '../../queries';

interface RoomActivityProps {
    roomId: string
}

export class RoomActivity extends React.Component<RoomActivityProps, any>{

    public render() {

        return <Query query={QUERIES.GET_ROOM_BY_ID} variables={{ id: this.props.roomId }}>
            {
                ({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    return <table className="table main-table">
                        <thead>
                            <tr>
                                <th colSpan={2}>Играчи в стаята</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.getRoomById && data.getRoomById.players.map((player: any) => {
                                    return <tr key={player.id}>
                                        <td>{player.name}</td>
                                        <td><button type="button" className="btn btn-danger btn-sm">Изгони <i className="fa fa-user-times"></i></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                }
            }

        </Query>
    }
}