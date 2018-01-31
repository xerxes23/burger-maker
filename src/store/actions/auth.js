import * as actionTypes from './actionTypes';
import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const auth = (email, password) => dispatch => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true

    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDXNQwuI642Rc4lZ_KiFS3kKcreHzu5GyQ', authData)
        .then( response => {
            console.log(response.data);
            dispatch(authSuccess());
        })
        .catch( error => {
            console.log(error);
            dispatch(authFail(error))
        })
}