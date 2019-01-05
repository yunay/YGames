import * as React from 'react'
import { Query } from 'react-apollo';
import { QUERIES } from '../../queries';
import { identity } from '../identity';

interface RoomActivityProps {
    roomId: string
}

export class RoomActivity extends React.Component<RoomActivityProps, any>{
    private user:any = null;

    constructor(props:RoomActivityProps){
        super(props);

        this.user = identity.userInfo();
    }
    public render() {

        return <Query query={QUERIES.GET_ROOM_BY_ID} variables={{ id: this.props.roomId }}>
            {
                ({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    return <table className="table main-table">
                        {
                            data && data.getRoomById && <>
                            <thead>
                            <tr>
                                <th colSpan={2}>Име на стаята "{data.getRoomById.name}"</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.getRoomById.players.map((player: any) => {
                                    return <tr key={player.id}>
                                        <td>{player.name}</td>
                                        <td>{player.id == this.user.id ? <span>Домакин</span> : <button type="button" className="btn btn-danger btn-sm">Изгони <i className="fa fa-user-times"></i></button>}</td>
                                    </tr>
                                })
                            }
                           <tr key={9999}>
                                        <td colSpan={2}>Брой играчи: {data.getRoomById.players.length}</td>
                                    </tr>
                        </tbody>
                            </>
                        }
                    
                        
                    </table>
                }
            }

        </Query>
    }
}