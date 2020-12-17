import React, { Component } from 'react';

import styles from './style.module.css';
import Toolbar from '../../components/Toolbar';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;