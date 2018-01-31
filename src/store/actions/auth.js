import * as actionTypes from './actionTypes';

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
    
}