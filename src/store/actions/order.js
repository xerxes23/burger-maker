import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';


export const purchaseBurgerSuccess = ( id, orderData ) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
});

export const purchaseBurgerFail = error => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});


export const purchaseBurger = orderData => dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post( '/orders.json', orderData )
            .then( response => {
                dispatch( purchaseBurgerSuccess(response.data, orderData) )
            })
            .catch( error => {
                dispatch( purchaseBurgerFail(error) )
            });
}