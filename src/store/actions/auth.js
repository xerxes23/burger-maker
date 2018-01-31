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
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch( error => {
            console.log(error);
            dispatch(authFail(error))
        })
}