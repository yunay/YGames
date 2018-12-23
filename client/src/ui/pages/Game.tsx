import * as React from 'react'
import { Lobby } from 'common'

interface GameProps {
    game:string;
}

const Game = function(props:GameProps){
    return <Lobby/>
}

export default Game;