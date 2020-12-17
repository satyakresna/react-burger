import React from 'react';

import styles from './style.module.css';
import NavItem from './NavItem';

const navItems = (props) => (
    <ul className={styles.NavItems}>
        <NavItem link="/orders">Orders</NavItem>
    </ul>
);

export default navItems;