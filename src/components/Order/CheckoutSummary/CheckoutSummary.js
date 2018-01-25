import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const CheckoutSummary = ({ingredients, checkoutCancelled, checkoutContinued}) => (
    <div className={classes.CheckoutSummary} >
        <h1>We hope it tastes well!</h1>
        <div style={{width: '100%', margin: 'auto', padding: '0px'}} >
            <Burger ingredients={ingredients} />
        </div>
        <Button 
            btnType='Danger'
            clicked={checkoutCancelled} >CANCEL</Button>
        <Button 
            btnType='Success'
            clicked={checkoutContinued}
            >CONTINUE</Button>
    </div>
)
            
export default CheckoutSummary;