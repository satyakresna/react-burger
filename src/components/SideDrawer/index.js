import React from 'react';

import Logo from '../Logo';
import NavigationItems from '../NavigationItems';
import styles from './style.module.css';
import Backdrop from '../UI/Backdrop';

const sideDrawer = (props) => {
    let attachedstyles = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedstyles = [styles.SideDrawer, styles.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedstyles.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;