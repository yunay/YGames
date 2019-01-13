import * as React from 'react'
import saboteur from '../../images/saboteur.jpg'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Game from './Game'
import { Query, Mutation, graphql } from 'react-apollo';
import { QUERIES, MUTATIONS } from '../../queries';
import { GameContext, identity } from 'common';
import { GameProcessing } from './GameProcessing';

interface GamesProps extends RouteComponentProps{

}

class GamesImpl extends React.Component<GamesProps, any> {
    private user: any;

    constructor(props:GamesProps){
        super(props)

        this.user = identity.userInfo();
    }

    render() {
        var roomId = (this.props.match.params as any).roomId;
        var gameName = (this.props.match.params as any).game;

        if (gameName)
           (this.props as any).changeUserStatus({variables:{userId: this.user.id, status:true}});
        else
            (this.props as any).changeUserStatus({variables:{userId: this.user.id, status:false}});

        //TODO: Да се проверява дали подаденото ID го има като стая и дали потребителят е влязал в стаята
        if (roomId != null && roomId != undefined) {
            return <Query query={QUERIES.GET_GAME_BY_NAME} variables={{ originalName: gameName }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return `Error!: ${error}`;

                        return data && <GameContext.Provider value={data.getGameByName}>
                            <GameProcessing roomId={roomId} />
                        </GameContext.Provider>
                    }
                }
            </Query>
        }

        var gameName = (this.props.match.params as any).game;
        if (gameName != null && gameName != undefined) {

            return <Query query={QUERIES.GET_GAME_BY_NAME} variables={{ originalName: gameName }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return `Error!: ${error}`;

                        return data && <GameContext.Provider value={data.getGameByName}>
                            <Game />
                        </GameContext.Provider>
                    }
                }
            </Query>
        }

        return <Query query={QUERIES.GET_GAMES}>
            {
                ({ loading, error, data }) => {

                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    return <div className="row">
                        {
                            data && data.getGames.map((game: any) => {
                                return <div className="col-md-3" key={game.id}>
                                    <div className="card" style={{ "width": "18rem" }}>
                                        <img className="card-img-top" src={saboteur} />
                                        <div className="card-body">
                                            <h5 className="card-title">{game.translatedName}</h5>
                                            <p className="card-text">{game.shortDescription}</p>
                                            <Link className="btn btn-primary" to={`/games/${game.originalName}`}>Играй</Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            }

        </Query>
    }
}

export const Games = withRouter(graphql<GamesProps>(MUTATIONS.CHANGE_USER_ONLINE_STATUS, {name: "changeUserStatus"})(GamesImpl));