import * as React from 'react'
import saboteur from '../../images/saboteur.jpg'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Game from './Game'

class GamesImpl extends React.Component<RouteComponentProps, any> {

    render() {
        var game = (this.props.match.params as any).game

        if(game != "" && game != null && game != undefined){
            return <Game game={game}/>
        }
        
        return <div>
            <div className="row">
                <div className="col-md-3">
                    <div className="card" style={{ "width": "18rem" }}>
                        <img className="card-img-top" src={saboteur} />
                        <div className="card-body">
                            <h5 className="card-title">Саботьор</h5>
                            <p className="card-text">Забавна игра с карти. </p>
                            <Link className="btn btn-primary" to={`/games/saboteur`}>Играй</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

const Games = withRouter(GamesImpl);
export default Games;