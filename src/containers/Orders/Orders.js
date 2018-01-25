import React, { Component } from 'react';

import classes from './Orders.css'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then( res => {
                let fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(error => {
                console.log(error);
            }) 
    }

    render () {
        let orders = <Spinner/>
        if (!this.state.loading) {
            orders = this.state.orders.map((order) => (
                <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
            ))
        }
        return (
            <div className={classes.Orders} >
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);