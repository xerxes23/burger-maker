import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import { Logo } from './Logo.css'

const logo = () => (
    <div className={Logo} >
        <img src={burgerLogo} alt='myBurger' />
    </div>
)

export default logo;