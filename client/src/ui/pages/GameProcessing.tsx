import * as React from 'react'
import { Chat, ActiveUsers } from 'common';

export class GameProcessing extends React.Component<any,any>{
    render(){return  <div className="row">
    <div className="col-4">
        <Chat />
    </div>
    <div className="col-4">
        <ActiveUsers />
    </div>
 
</div>}
} 
