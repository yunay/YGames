import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Navigation } from './YGames.UI/Navigation'

export class App extends React.Component<{},{}>{
    render(){
        return (<Navigation/>)
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))