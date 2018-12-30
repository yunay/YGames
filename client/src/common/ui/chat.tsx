import * as React from 'react'
import { Query, Mutation } from 'react-apollo';
import { MUTATIONS, QUERIES, SUBSCRIPTIONS } from '../../queries';
import './common.css';
import { User } from '../../models/ViewModels';
import { identity } from 'common'

class ChatBody extends React.Component<any, any>{
    private user: User;

    constructor(props:any){
        super(props);

        this.user = identity.userInfo();
    }

    render(){
        var unsubscribe: any = null;

        return  <Query query={QUERIES.GET_MESSAGES}>

        {({ loading, error, data, subscribeToMore }) => {

            if (loading) return null;
            if (error) return `Error!: ${error}`;

            if (!unsubscribe) {
                unsubscribe = subscribeToMore({
                    document: SUBSCRIPTIONS.ON_ADDED_MSG,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;

                        const messageAdded = subscriptionData.data.messageAdded;
                  
                        return {
                            ...prev,
                            getMessages: [...prev.getMessages, messageAdded]
                        };
                    }
                });
            }

            return data && data.getMessages.map((message: any, id: number) => {
                if(message.ownerId === this.user._id)
                    return <div key={id} className="chat-message chat-msg-sent"><span>{message.text}</span></div>

                return <div key={id} className="chat-message chat-msg-received"><span>{message.text}</span></div>
            })
        }}
    </Query>
    }
}

class ChatInput extends React.Component<any, any>{
    private message:any = null;
    private user: User;

    constructor(props:any){
        super(props);

        this.user = identity.userInfo();
    }

    render() {
        return <Mutation mutation={MUTATIONS.ADD_MESSAGE_QUERY}>
                {(addMessage, { data }) => (
                    <div className="msg-input">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control chat-input" ref={(e) => this.message = e} placeholder="..." />
                            <div className="input-group-append">
                                <button onClick={(e:any) => {
                                    addMessage({ variables: { text: this.message.value, ownerName: this.user.name, ownerId: this.user._id } });
                                    this.message.value = "";
                                }} className="btn main-color main-text" type="button">Изпрати</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Mutation>
    }
}

export class Chat extends React.Component<any, any>{

    public render() {

        return <div className="chat box">
            <div className="chat-head head-text">💬</div>
            <div className="chat-body">
                <ChatBody />
            </div>
            <ChatInput />
        </div>
    }
}