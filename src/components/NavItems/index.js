import React from 'react';

import styles from './style.module.css';
import NavItem from './NavItem';

const navItems = (props) => {
    console.log('props in navItems', props);
    return (
        <ul className={styles.NavItems}>
            <NavItem link="/orders">Orders</NavItem>
            {!props.isLoggedIn ? <NavItem link="/auth">Authenticate</NavItem> : <NavItem link="/logout">Logout</NavItem>}
        </ul>
    );
} 

export default navItems;