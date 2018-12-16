import * as jwtDocde from 'jwt-decode';

const userInfo = ()=>{
    var token = localStorage.getItem('token');
    var refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken)
        return null;
    try {
        var { user } = jwtDocde(refreshToken);

        return user;
    } catch (e) {
        return null;
    }
}

const isAuthenticated = ()=> {
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

export const identity = {userInfo, isAuthenticated }
