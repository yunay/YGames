import * as React from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import * as jwtDocde from 'jwt-decode';
import Home from '../pages/Home'
import Games from '../pages/Games'
import Books from '../pages/Books'
import { Login } from '../pages/Login'
import Registration from '../pages/Registration'
import NotFound from '../pages/NotFound'
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export const checkAuth = () => {
    var token = localStorage.getItem('token');
    var refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken)
        return false;

    try {
        var { exp } = jwtDocde(refreshToken);

        if (exp < new Date().getTime() / 1000) {
            return false;
        }
    } catch (e) {
        return false;
    }

    return true;
}

@observer export default class Navigation extends React.Component<{}, {}> {
    @observable isUserAuthenticated: boolean = false;

    constructor(props: any) {
        super(props);

        this.isUserAuthenticated = checkAuth();
        this.handleLoginCallback = this.handleLoginCallback.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
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
                    <Route exact path="/books" component={Books} />
                    <Route path="/register" component={() => this.isUserAuthenticated ? <Redirect to='/' /> : <Registration />} />
                    <Route path="/login" component={() => this.isUserAuthenticated ? <Redirect to='/' /> : <Login handleLogin={this.handleLoginCallback} />} />} />
                    <Route path="/games" component={() => !checkAuth() ? <Login handleLogin={this.handleLoginCallback} /> : <Games />} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div></>
        </BrowserRouter>
    }

    private renderAuthMenu() {
        return <ul className="navbar-nav ml-auto">
            {
                this.isUserAuthenticated
                    ? <li className="nav-item"><a className="nav-link" onClick={this.handleLogout}>ИЗХОД</a></li>
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
        this.isUserAuthenticated = checkAuth();
    }

    private handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.isUserAuthenticated = checkAuth();
    }
}