import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/CheckoutData/ContactData';

class Checkout extends Component {

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render () {
        let summary = <Redirect to='/'/>;
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        price={this.props.price}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}
                    />
                    <Route 
                        path={`${this.props.match.path}/contact-data`} 
                        component={ContactData}
                    />
                </div>  
            )
        }
        return summary;
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price
});

export default connect(mapStateToProps)(Checkout);