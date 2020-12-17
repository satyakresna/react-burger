import React from 'react';

import styles from './style.module.css';
import NavItem from './NavItem';

const navItems = (props) => (
    <ul className={styles.NavItems}>
        { props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null }
        { !props.isAuthenticated 
            ? <NavItem link="/auth">Authenticate</NavItem> 
            : <NavItem link="/logout">Logout</NavItem> 
        }
    </ul>
);

export default navItems;