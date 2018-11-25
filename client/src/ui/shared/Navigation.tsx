import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import Home from '../pages/Home'
import Games from '../pages/Games'
import Books from '../pages/Books'
import NotFound from '../pages/NotFound'

export default class Navigation extends React.Component<{}, {}> {

    public render() {
        return <BrowserRouter basename="/"><>
            <nav className="navbar navbar-expand-lg main-navbar main-text fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Saboteur</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">НАЧАЛО
                  <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/games">ИГРАЙ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/books">Книги</Link>
                            </li>
                        </ul>
                        {this.renderAuthMenu()}
                    </div>
                </div>
            </nav>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/games" component={Games} />
                    <Route exact path="/books" component={Books} />
                    {/* <Route path="/Register" component={() => this.props.user ? <Redirect to='/' /> : <Register authenticatedUser={this.props.authenticatedUser} />} />
                    <Route path="/Login" component={() => this.props.user ? <Redirect to='/' /> : <Login authenticatedUser={this.props.authenticatedUser} />} />} />
                    <Route path="/Play" component={() => !this.props.user ? <Login authenticatedUser={this.props.authenticatedUser} /> : <Play />} /> */}
                    <Route path="*" component={NotFound} />
                </Switch>
            </div></>
        </BrowserRouter>
    }

    private renderAuthMenu() {
        // return <ul className="navbar-nav ml-auto">
        //     {
        //         this.props.user ? <li className="nav-item"><a className="nav-link" onClick={this.handleLogout}>ИЗХОД</a></li>
        //             : <><li className="nav-item"><Link className="nav-link" to="/register">РЕГИСТРАЦИЯ</Link></li><li className="nav-item"><Link className="nav-link" to="/login">ВХОД</Link></li></>
        //     }
        // </ul>
    }
}