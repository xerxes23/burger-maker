import React from 'react';

import { NavigationItems } from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({isAuth}) => (
    <ul className={NavigationItems} >
        <NavigationItem
            link='/'
        >Burger Builder</NavigationItem>
        <NavigationItem
            link='/orders'
        >Orders</NavigationItem>
        
        {
            !isAuth ? <NavigationItem link='/auth' > Authenticate</NavigationItem>
                : <NavigationItem link='/logout' > Logout</NavigationItem>
        }
         
    </ul>
);

export default navigationItems;