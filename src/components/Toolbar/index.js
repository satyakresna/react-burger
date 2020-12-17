import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.module.css';
import Logo from '../Logo';
import NavItems from '../NavItems';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <NavLink to="/" exact className={styles.Logo}>
            <Logo />
        </NavLink>
        <nav>
            <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;