import * as React from 'react'
import saboteur from '../../images/saboteur.jpg'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Game from './Game'
import { Query } from 'react-apollo';
import { QUERIES } from '../../queries';
import { GameContext } from 'common';

class GamesImpl extends React.Component<RouteComponentProps, any> {

    render() {
        var gameName = (this.props.match.params as any).game;
        if (gameName != null && gameName != undefined) {

            return <Query query={QUERIES.GET_GAME_BY_NAME} variables={{originalName:gameName}}>
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

const Games = withRouter(GamesImpl);
export default Games;