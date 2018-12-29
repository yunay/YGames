import * as React from 'react'
import { Chat } from './chat'
import { ActiveUsers } from './active-users'
import { Rooms } from './rooms'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

@observer export class Lobby extends React.Component<{}, {}>{
    @observable private shownGameRulesModal: boolean;
    @observable private shownCreateRoomModal: boolean;
    @observable private roomName:string = "";

    constructor(props: any) {
        super(props);

        this.shownGameRulesModal = false;
        this.shownCreateRoomModal = false;

        this.toggleGameRulesModal = this.toggleGameRulesModal.bind(this);
        this.toggleCreateRoomModal = this.toggleCreateRoomModal.bind(this);
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
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
                        <button type="button" className="btn btn-info btn-md lobby-main-btn" onClick={this.toggleGameRulesModal}>
                            <i className="fa fa-info-circle"></i>Правила на играта</button>
                        <button type="button" className="btn btn-success btn-md lobby-main-btn" onClick={this.toggleCreateRoomModal}>
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

            <Modal isOpen={this.shownGameRulesModal} toggle={this.toggleGameRulesModal}>
                <ModalHeader toggle={this.toggleGameRulesModal} close={<button className="close" onClick={this.toggleGameRulesModal}>&times;</button>}>Правила на играта</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                    </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleGameRulesModal}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggleGameRulesModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.shownCreateRoomModal} toggle={this.toggleCreateRoomModal}>
                <ModalHeader toggle={this.toggleCreateRoomModal} close={<button className="close" onClick={this.toggleCreateRoomModal}>&times;</button>}>Създай нова стая</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12">
                        <label htmlFor="room-name">Име
                         <input type="text" id="room-name" className="form-control" value={this.roomName} onChange={this.handleRoomNameChange} />
                        </label>
                        </div>
                    </div>
                    </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleCreateRoomModal}>Създай</Button>{' '}
                    <Button color="secondary" onClick={this.toggleCreateRoomModal}>Откажи</Button>
                </ModalFooter>
            </Modal>
        </div>
    }

    private toggleGameRulesModal() {
        this.shownGameRulesModal = !this.shownGameRulesModal;
    }

    private handleRoomNameChange(e:any){
        this.roomName = e.target.name;
    }

    private toggleCreateRoomModal() {
        this.shownCreateRoomModal = !this.shownCreateRoomModal;
    }
}