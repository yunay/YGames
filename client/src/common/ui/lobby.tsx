import * as React from 'react'
import { Chat } from './chat'
import { ActiveUsers } from './active-users'
import { Rooms } from './rooms'
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer export class Lobby extends React.Component<{}, {}>{
    @observable private shownGameRules:boolean;

    constructor(props:any){
        super(props);

        this.shownGameRules = false;
        this.toggleGameRules = this.toggleGameRules.bind(this);
    }

    public render() {

        return <div>
            <div className="row">
                <div className="col-md-7">
                    <h2 className="lobby-main-header">Добре дошли!</h2>
                    <h3 className="lobby-main-header">Приятна игра на Саботьор!</h3>
                </div>
                <div className="col-md-5">
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-info btn-md lobby-main-btn" onClick={this.toggleGameRules}>
                        <i className="fa fa-info-circle"></i>Правила на играта</button>
                        <button type="button" className="btn btn-success btn-md lobby-main-btn">
                        <i className="fa fa-play-circle-o"></i>Създай стая за игра</button>
                    </div>
                </div>
            </div>
            <div className="row">
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
            <div className="row">
                <div className={`modal fade ${this.shownGameRules ? "show" : ""}`} role="dialog" style={this.shownGameRules ? {display: "block", paddingRight: "17px"}: {}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Правила на играта</h5>
                                <button type="button" className="close" onClick={this.toggleGameRules}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    private toggleGameRules(){
        this.shownGameRules = !this.shownGameRules;
    }
}