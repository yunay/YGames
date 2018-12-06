import * as React from 'react'
import { Saboteur } from 'games'
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

export default class Games extends React.Component<{},{}>{
    
    public render(){

        return <div>
            <ul>
                <li>
                    <Link to="/games/saboteur">Саботьор</Link>
                </li>
            </ul>

             <Route path="/games/saboteur" component={Saboteur} />

        </div>
    }
}