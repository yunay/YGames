import * as React from 'react'
import { Query } from 'react-apollo';
import { QUERIES, SUBSCRIPTIONS } from '../../queries';

export class ActiveUsers extends React.Component<any, any>{

    public render() {
        var unsubscribe: any = null;

        return <Query query={QUERIES.GET_ONLINE_USERS} partialRefetch={true}>
            {
                ({ loading, error, data, subscribeToMore }) => {

                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    if (!unsubscribe) {
                        unsubscribe = subscribeToMore({
                            document: SUBSCRIPTIONS.ON_USER_ACTIVITY_CHANGE,
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;

                                return {
                                    ...prev,
                                    getOnlineUsers: subscriptionData.data.userActivityChange
                                };
                            }
                        });
                    }
                    return <table className="table main-table">
                        <thead>
                            <tr>
                                <th colSpan={2}>Играчи</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.getOnlineUsers && data.getOnlineUsers.map((user: any, id: number) => {
                                    return <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td><span className="badge badge-success">Свободен</span></td>
                                        <td><button type="button" className="btn btn-danger btn-sm">Откажи <i className="fa fa-user-times"></i></button></td>
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