import * as React from 'react'
import { Chat, ActiveUsers, Rooms } from 'common'

export class Saboteur extends React.Component<{}, {}>{

    public render() {

        return <div className="row">
            <div className="col-4">
                <Chat />
            </div>
            <div className="col-3">
                <ActiveUsers />
            </div>
            <div className="col-3">
                <Rooms />
            </div>
        </div>
    }
}