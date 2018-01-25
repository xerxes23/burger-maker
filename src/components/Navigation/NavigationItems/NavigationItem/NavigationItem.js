import React from 'react';
import { NavLink } from 'react-router-dom';

import classes, { NavigationItem } from './NavigationItem.css';

const navigationItem = ({children, link}) => (
    <li className={NavigationItem} >
        <NavLink 
            exact 
            to={link} 
            activeClassName={classes.active} 
        >{children}</NavLink>
    </li>
);

export default navigationItem;
