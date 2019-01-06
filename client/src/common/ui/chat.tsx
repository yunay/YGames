import * as React from 'react'
import { Query, Mutation } from 'react-apollo';
import { MUTATIONS, QUERIES, SUBSCRIPTIONS } from '../../queries';
import './common.css';
import { User } from '../../models/ViewModels';
import { identity } from '../identity'
import { helpers } from '../helpers';

interface ChatProps{
    roomId?:string;
    onNewMessage?:()=>void;
}

class ChatBody extends React.Component<ChatProps, any>{
    private user: User;

    constructor(props:ChatProps){
        super(props);

        this.user = identity.userInfo();
    }

    render(){
        var unsubscribe: any = null;

        return  <Query query={QUERIES.GET_MESSAGES} variables={{roomId:this.props.roomId}} onCompleted={()=>{this.props.onNewMessage()}}>

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
                if(message.owner.id === this.user.id)
                    return <div key={id} className="chat-message chat-msg-sent"><span>{message.text}</span></div>

                return <div key={id} className="chat-message chat-msg-received"><span>{message.text}</span></div>
            })
        }}
    </Query>
    }
}

class ChatInput extends React.Component<ChatProps, any>{
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
                            <input type="text" className="form-control chat-input" onKeyUp={e=>{
                                if(e.keyCode == 13){
                                    if(this.message.value && this.message.value.trim() != ""){
                                        addMessage({ variables: { text: this.message.value, owner: {id:this.user.id, name: this.user.name}, roomId: this.props.roomId } });
                                        this.message.value = "";
                                    }
                                }
                            }
                            } ref={(e) => this.message = e} placeholder="..." />
                            <div className="input-group-append">
                                <button onClick={(e:any) => {
                                    if(this.message.value && this.message.value.trim() != ""){
                                        var msg = helpers.wrapText(this.message.value,35)
                                        addMessage({ variables: { text: msg, owner: {id:this.user.id, name: this.user.name}, roomId: this.props.roomId } });
                                        this.message.value = "";
                                    }
                                }} className="btn main-color main-text" type="button">Изпрати</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Mutation>
    }
}

export class Chat extends React.Component<ChatProps, any>{
    
    public render() {

        return <div className="chat box" id="chatbox">
            <div className="chat-head head-text">💬</div>
            <div className="chat-body">
                <ChatBody onNewMessage={this.handleOnNewMessageCallback.bind(this)} roomId={this.props.roomId} />
            </div>
            <ChatInput roomId={this.props.roomId} />
        </div>
    }

    handleOnNewMessageCallback(){
        document.getElementsByClassName('chat-body')[0].scrollTop = document.getElementsByClassName('chat-body')[0].scrollHeight;
    }
}