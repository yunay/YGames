import * as React from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import Home from '../pages/Home'
import { Games } from '../pages/Games'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import NotFound from '../pages/NotFound'
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { identity } from 'common'

@observer export default class Navigation extends React.Component<{}, {}> {
    @observable isUserAuthenticated: boolean = false;

    constructor(props: any) {
        super(props);

        this.isUserAuthenticated = identity.isAuthenticated();
        this.handleLoginCallback = this.handleLoginCallback.bind(this);
        this.handleRegisterCallback = this.handleRegisterCallback.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    public render() {
        return <BrowserRouter basename="/"><>
            <nav className="navbar navbar-expand-lg main-navbar main-text fixed-top">
                <div className="container">
                    <a className="navbar-brand main-logo" href="#">YGames</a>
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
                        </ul>
                        {this.renderAuthMenu()}
                    </div>
                </div>
            </nav>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={() => this.isUserAuthenticated ? <Redirect to='/' /> : <Registration handleRegister={this.handleRegisterCallback} />} />
                    <Route path="/login" component={() => this.isUserAuthenticated ? <Redirect to='/' /> : <Login handleLogin={this.handleLoginCallback} />} />} />
                    <Route path="/games/:game?/:roomId?" component={() => !this.isUserAuthenticated ? <Login handleLogin={this.handleLoginCallback} /> : <Games />} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div></>
        </BrowserRouter>
    }

    private renderAuthMenu() {
        return <ul className="navbar-nav ml-auto">
            {
                this.isUserAuthenticated
                    ? <><li className="nav-item"><a className="nav-link"><span>{identity.userInfo().avatar}</span>{identity.userInfo().name}</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={this.handleLogout}>ИЗХОД</a></li>
                    </>
                    : <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">РЕГИСТРАЦИЯ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">ВХОД</Link>
                        </li>
                    </>
            }
        </ul>
    }

    private handleLoginCallback() {
        this.isUserAuthenticated = identity.isAuthenticated();
    }

    private handleRegisterCallback() {
        this.isUserAuthenticated = identity.isAuthenticated();
    }

    private handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.isUserAuthenticated = identity.isAuthenticated();
    }
}