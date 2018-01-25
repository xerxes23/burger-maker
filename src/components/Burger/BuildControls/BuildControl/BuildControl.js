import React from 'react';

import { Label, More, Less, BuildControl } from './BuildControl.css';

const buildControl = ({label, add, remove, disabled}) => (
    <div className={BuildControl} >
        <div className={Label} >{label}</div>
        <button 
            className={Less} 
            onClick={remove} 
            disabled={disabled}>Less</button>
        <button 
            className={More} 
            onClick={add}>More</button>
    </div>
);

export default buildControl;