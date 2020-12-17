import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.module.css';
import Logo from '../Logo';
import NavItems from '../NavItems';

const navbar = (props) => {
    console.log(props);
    return (
        <header className={styles.Navbar}>
            <NavLink to="/" exact className={styles.Logo}>
                <Logo />
            </NavLink>
            <nav>
                <NavItems />
            </nav>
        </header>
    );
}

export default navbar;