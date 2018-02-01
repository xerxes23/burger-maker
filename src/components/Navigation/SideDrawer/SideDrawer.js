import React from 'react';

import classes, {SideDrawer, Close, Open} from './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ({open, closed, isAuth}) => {
    let attachedClasses = [SideDrawer, Close];
    if (open) {
        attachedClasses = [SideDrawer, Open];
    }
    return(
        <Aux>
            <Backdrop show={open} clicked={closed} />
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo} >
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={isAuth} />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;