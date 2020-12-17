import React, { Component } from 'react';

import styles from './style.module.css';
import Navbar from '../../components/Navbar';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;