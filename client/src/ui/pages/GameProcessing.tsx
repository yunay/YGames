import * as React from 'react'
import { Chat, ActiveUsers, RoomActivity, GameContext, GameRules, identity } from 'common';
import { Query, Mutation, graphql } from 'react-apollo';
import { QUERIES, MUTATIONS } from '../../queries';
import { withRouter, RouteComponentProps, Prompt } from 'react-router';

interface GameProcessingProps extends RouteComponentProps {
    roomId?: string;
}

class GameProcessingImpl extends React.Component<GameProcessingProps, any>{
    private user: any = null;
    private ownerId:string = "";

    constructor(props: GameProcessingProps) {
        super(props)

        this.user = identity.userInfo();
    }

    componentWillUnmount(){
        if(this.user.id == this.ownerId)
            (this.props as any).removeRoomById({variables:{ id: this.props.roomId }});
    }

    render() {
        return <>
            <GameContext.Consumer>
                {
                    gameInfo => <><div className="row">
                        <div className="col-md-6">
                            <h3 className="lobby-main-header">Приятна игра на {gameInfo.translatedName}!</h3>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group mr-2" role="group">
                                <GameRules gameRules={gameInfo.gameRules} />

                                <Query query={QUERIES.GET_ROOM_BY_ID} variables={{ id: this.props.roomId }}>
                                    {
                                        ({ loading, error, data }) => {

                                            if (loading) return null;
                                            if (error) return `Error!: ${error}`;
                                            if(data && data.getRoomById)
                                                this.ownerId = data.getRoomById.owner.id;

                                            return data && data.getRoomById && data.getRoomById.owner.id == this.user.id
                                                ? <>
                                                    <button type="button" className="btn btn-success btn-sm lobby-main-btn"><i className="fa fa-play-circle-o"></i>Стартирай играта</button>
                                                    <Mutation mutation={MUTATIONS.REMOVE_ROOM_BY_ID}>
                                                        {
                                                            (removeRoomById) => {

                                                                return <>

                                                                    <button type="button" onClick={() => {

                                                                        removeRoomById({ variables: { id: this.props.roomId } }).then(() => {
                                                                            this.props.history.push(`/games/${gameInfo.originalName}`)
                                                                        })
                                                                    }} className="btn btn-danger btn-sm lobby-main-btn"><i className="fa fa-play-circle-o"></i>Изтрий стаята</button>
                                                                </>
                                                            }
                                                        }
                                                    </Mutation></>
                                                : null
                                        }
                                    }
                                </Query>
                            </div>
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-4">
                                <Chat roomId={this.props.roomId} />
                            </div>
                            <div className="col-4">
                                <ActiveUsers />
                            </div>
                            <div className="col-4">
                                <RoomActivity roomId={this.props.roomId} />
                            </div>
                        </div>

                    </>
                }
            </GameContext.Consumer>
        </>
    }
}

export default withRouter(graphql<GameProcessingProps>(MUTATIONS.REMOVE_ROOM_BY_ID, { name: "removeRoomById" })(GameProcessingImpl));