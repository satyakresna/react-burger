import React, { Component } from 'react';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        // Using local storage to check whether user is authenticated is a bad idea
        // TODO: Find a better one
        let token = localStorage.getItem('token');
        return (
            <React.Fragment>
                <Toolbar 
                isAuthenticated={token !== null ? true : false}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={token !== null ? true : false}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;