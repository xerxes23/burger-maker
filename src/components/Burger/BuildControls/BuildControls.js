import React from 'react';

import {OrderButton, BuildControls} from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = ({add, remove, disabled, price, purchasable, purchasing}) => (
    <div className={BuildControls} >
        <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
        {   controls.map( control => (
                <BuildControl  
                    key={control.label} 
                    label={control.label} 
                    type={control.type}
                    add={() => add(control.type)}
                    remove={() => remove(control.type)} 
                    disabled={disabled[control.type]}  
                />
            ))
        }
        <button
            className={OrderButton}  
            disabled={!purchasable} 
            onClick={purchasing} 
        >ORDER NOW</button>
    </div>
);

export default buildControls;