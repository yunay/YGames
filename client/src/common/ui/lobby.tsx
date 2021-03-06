import * as React from 'react'
import { Chat } from './chat'
import { ActiveUsers } from './active-users'
import { Rooms } from './rooms'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Game } from 'models/ViewModels';
import { Mutation } from 'react-apollo';
import { MUTATIONS } from '../../queries';
import { identity } from 'common/identity';
import { withRouter } from 'react-router';
import { GameRules } from './game-rules';

export const GameContext = React.createContext(new Game())

@observer class LobbyImpl extends React.Component<any, any>{
    @observable private shownCreateRoomModal: boolean;
    private roomName: any = null;

    private user: any;

    constructor(props: any) {
        super(props);

        this.shownCreateRoomModal = false;
        this.user = identity.userInfo();

        this.toggleCreateRoomModal = this.toggleCreateRoomModal.bind(this);
    }

    public render() {

        return <div>
            <div className="row">
                <div className="col-md-7">
                    <h2 className="lobby-main-header">Добре дошли!</h2>
                    <h3 className="lobby-main-header">Приятна игра на <GameContext.Consumer>{gameInfo => gameInfo.translatedName}</GameContext.Consumer>!</h3>
                </div>
                <div className="col-md-5">
                    <div className="btn-group mr-2" role="group">
                        <GameContext.Consumer>{gameRules => <GameRules gameRules={gameRules.gameRules}/>}</GameContext.Consumer>
                        <button type="button" className="btn btn-success btn-md lobby-main-btn" onClick={this.toggleCreateRoomModal}>
                            <i className="fa fa-play-circle-o"></i>Създай стая за игра</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Chat roomId={"lobby"}/>
                </div>
                <div className="col-4">
                    <ActiveUsers />
                </div>
                <div className="col-4">
                    <Rooms />
                </div>
            </div>

            <Modal isOpen={this.shownCreateRoomModal} toggle={this.toggleCreateRoomModal}>
                <ModalHeader toggle={this.toggleCreateRoomModal} close={<button className="close" onClick={this.toggleCreateRoomModal}>&times;</button>}>Създай нова стая</ModalHeader>

                <Mutation mutation={MUTATIONS.ADD_ROOM_QUERY}>
                    {
                        (addRoom, { data }) => {
                            return <>
                                <ModalBody>
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="room-name">Име
                                            <input type="text" id="room-name" className="form-control" ref={(e) => this.roomName = e} />
                                            </label>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <GameContext.Consumer>
                                        {
                                            gameInfo => {
                                                return <><Button color="primary" onClick={() => {
                                                    addRoom({ variables: { gameId: gameInfo.id, name: this.roomName.value, owner: { id: this.user.id, name: this.user.name} } }).then((room)=>{
                                                        this.props.history.push(this.props.location.pathname+"/"+(room as any).data.addRoom.id)
                                                    });
                                                }}>Създай</Button>{' '}
                                                    <Button color="secondary" onClick={this.toggleCreateRoomModal}>Откажи</Button></>
                                            }
                                        }
                                    </GameContext.Consumer>
                                </ModalFooter></>
                        }
                    }
                </Mutation>
            </Modal>
        </div>
    }

    private toggleCreateRoomModal() {
        this.shownCreateRoomModal = !this.shownCreateRoomModal;
    }
}

export const Lobby = withRouter(LobbyImpl);