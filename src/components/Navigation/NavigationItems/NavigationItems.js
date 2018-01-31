import React from 'react';

import { NavigationItems } from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={NavigationItems} >
        <NavigationItem
            link='/'
        >Burger Builder</NavigationItem>
        <NavigationItem
            link='/orders'
        >Orders</NavigationItem>
        <NavigationItem
            link='/auth'
        >Authenticate</NavigationItem>
    </ul>
);

export default navigationItems;