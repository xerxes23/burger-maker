import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';

const orderSummary = ({ingredients, continuePurchase, cancelPurchase, price}) => {

    const ingredientSummary = Object.keys(ingredients)
        .map( igKey => {
            return (
                <li key={igKey} > 
                    <span style={{textTransform: 'capitalize'}} >{igKey}</span>: {ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout</p>
            <p><strong>Total Price: {price.toFixed(2)} </strong></p>
            <Button
                btnType='Danger'
                clicked={cancelPurchase}
            >CANCEL</Button>
            <Button
                btnType='Success'
                clicked={continuePurchase}
            >CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary