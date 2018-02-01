import * as actionTypes from './actionTypes';
import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = expirationTime => dispatch => {
    setTimeout(() => dispatch(authLogout()), expirationTime * 1000)
}

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true

    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDXNQwuI642Rc4lZ_KiFS3kKcreHzu5GyQ'
    
    if (!isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDXNQwuI642Rc4lZ_KiFS3kKcreHzu5GyQ'
    }

    axios.post(url, authData)
        .then( response => {
            console.log(response.data);
            const expirationDate = new Date(new Date() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch( error => {
            dispatch(authFail(error.response.data.error))
        })
}


export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
});