import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        /* axios.get('https://react-my-burger-4ac9b.firebaseio.com/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            }) */
    }

   updatePurchasable = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)      
        return sum>0;
    }

    updatePurchasing = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');      
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients could not be loaded</p> : <Spinner/>; 
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        add={this.props.onIngredientAdded} 
                        remove ={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                        purchasing={this.updatePurchasing}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.props.ingredients} 
            continuePurchase={this.continuePurchaseHandler}
            cancelPurchase={this.cancelPurchaseHandler}
            price={this.props.price}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    price: state.price
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingredientType) => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
    onIngredientRemoved: (ingredientType) => dispatch(burgerBuilderActions.removeIngredient(ingredientType))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));