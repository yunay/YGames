import * as React from 'react'
import { Chat } from './chat'
import { ActiveUsers } from './active-users'
import { Rooms } from './rooms'

export class Lobby extends React.Component<{}, {}>{

    public render() {

        return <div className="row">
            <div className="col-4">
                <Chat />
            </div>
            <div className="col-4">
                <ActiveUsers />
            </div>
            <div className="col-4">
                <Rooms />
            </div>
        </div>
    }
}