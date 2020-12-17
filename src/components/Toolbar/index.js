import React from 'react';

import styles from './style.module.css';
import Logo from '../Logo';
import NavItems from '../NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;