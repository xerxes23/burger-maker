import React from 'react';

import classes, { Button } from './Button.css'

const button = ({children, clicked, btnType, disabled}) => (
    <button
        onClick={clicked}
        disabled={disabled}
        className={[Button, classes[btnType]].join(' ')}
    >
        {children}
    </button>
);

export default button;
