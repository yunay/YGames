import * as React from 'react'
import { observable } from 'mobx';
import { graphql, Query } from 'react-apollo';
import { MUTATIONS, QUERIES, SUBSCRIPTIONS } from '../../queries';
import './common.css';

interface ChatProps{

}

const ChatBody = ()=>{
    var unsubscribe:any = null;

    return <Query query={QUERIES.GET_MESSAGES}>

    {({ loading, error, data, subscribeToMore  }) => {
    
    if (loading) return null;
    if (error) return `Error!: ${error}`;


    if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: SUBSCRIPTIONS.ON_ADDED_MSG,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            
            const messageAdded = subscriptionData.data.messageAdded;
            console.log(prev)
            console.log(messageAdded)
            return {
              ...prev,
              getMessages: [...prev.getMessages, messageAdded]
            };
          }
        });
      }
        
        return data && data.getMessages.map((message:any, id:number)=>{
            return <div key={id} className="chat-message chat-msg-received"><span>{message.text}</span></div>
        })
    }}
    </Query>
}

class ChatImpl extends React.Component<ChatProps,{}>{
    @observable messageText: string = "";
    @observable messages: any[] = [];

    constructor(props:ChatProps){
        super(props);

        this.handleSend = this.handleSend.bind(this);
        this.handleTypeMessage = this.handleTypeMessage.bind(this);
    }

    public render(){
    
        return <div className="chat box">
        <div className="chat-head head-text">ЧАТ</div>
        <div className="chat-body">
            <ChatBody/>
        </div>
        <div className="msg-input">
            <div className="input-group mb-3">
                <input type="text" className="form-control chat-input" onChange={this.handleTypeMessage} value={this.messageText} placeholder="..." />
                <div className="input-group-append">
                    <button onClick={this.handleSend} className="btn main-color main-text" type="button">Изпрати</button>
                </div>
            </div>
        </div>
    </div>
    }


    private handleTypeMessage(e: any) {
        this.messageText = e.target.value;
    }

    private handleSend() {
        (this.props as any).addMessage({
            variables: { text: this.messageText, owner: "Yunay" },
        });
    }
}

export const Chat =  graphql<ChatProps>(MUTATIONS.ADD_MESSAGE_QUERY,{name:"addMessage"})(ChatImpl);
