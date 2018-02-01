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


export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post( `/orders.json?auth=${token}`, orderData )
            .then( response => {
                dispatch( purchaseBurgerSuccess(response.data.name, orderData) )
            })
            .catch( error => {
                dispatch( purchaseBurgerFail(error) )
            });
}

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token) => dispatch => {
    dispatch(fetchOrdersStart());
    axios.get(`/orders.json?auth=${token}`)
            .then( res => {
                let fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            }) 
}