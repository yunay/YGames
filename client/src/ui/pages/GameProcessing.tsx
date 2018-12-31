import * as React from 'react'
import { Chat, ActiveUsers, RoomActivity, GameContext, GameRules } from 'common';

export class GameProcessing extends React.Component<any, any>{
    render() {
        return <>
            <div className="row">
                <div className="col-md-7">
                    <h2 className="lobby-main-header">Добре дошли!</h2>
                    <h3 className="lobby-main-header">Приятна игра на <GameContext.Consumer>{gameInfo => gameInfo.translatedName}</GameContext.Consumer>!</h3>
                </div>
                <div className="col-md-5">
                    <div className="btn-group mr-2" role="group">
                        <GameContext.Consumer>{gameRules => <GameRules gameRules={gameRules.gameRules} />}</GameContext.Consumer>
                        <button type="button" className="btn btn-success btn-md lobby-main-btn">
                            <i className="fa fa-play-circle-o"></i>Стартирай играта</button>
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
                    <RoomActivity />
                </div>
            </div>
        </>
    }
} 