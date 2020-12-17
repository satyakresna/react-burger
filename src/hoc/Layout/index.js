import React, { Component } from 'react';

import styles from './style.module.css';
import Toolbar from '../../components/Toolbar';

class Layout extends Component {
    render() {
        // Using local storage to check whether user is authenticated is a bad idea
        // TODO: Find a better one
        let token = localStorage.getItem('token');
        return (
            <React.Fragment>
                <Toolbar 
                isAuthenticated={token !== null ? true : false} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;