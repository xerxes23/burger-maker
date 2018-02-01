import React from 'react';

import classes, { Toolbar, DesktopOnly } from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ({toggleDrawer, isAuth}) => (
    <header className={Toolbar} >
        <DrawerToggle clicked={toggleDrawer} />
        <div className={classes.Logo} >
            <Logo/>
        </div>
        <nav className={DesktopOnly} >
            <NavigationItems isAuth={isAuth} />
        </nav>
    </header>
);

export default toolbar