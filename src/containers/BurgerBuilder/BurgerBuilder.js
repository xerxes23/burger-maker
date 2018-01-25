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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .8,
    cheese: .5,
    meat: 1.2
};

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
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
        this.setState({purchasable: sum>0})
    }

    addIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.price + INGREDIENT_PRICES[type];
        const ingredients = {
            ...this.state.ingredients,
            [type]: updatedIngredientCount,
        }
        this.setState({
            ingredients,
            price: updatedPrice
        });
        this.updatePurchasable(ingredients);
    } 

    removeIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        const updatedPrice = this.state.price - INGREDIENT_PRICES[type];
        const ingredients = {
            ...this.state.ingredients,
            [type]: updatedIngredientCount,
        }
        if (this.state.ingredients[type]!==0) {
            this.setState({
                ingredients,
                price: updatedPrice
            })
        }
        this.updatePurchasable(ingredients);
    }

    updatePurchasing = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.price)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })      
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
                        purchasable={this.state.purchasable}
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
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingredientType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType}),
    onIngredientRemoved: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType}),

})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));