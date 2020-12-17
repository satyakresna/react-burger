import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        // This is a bad idea. Find the good one!
        localStorage.removeItem('token');
    }

    render() {
        return <Redirect to="/"/>;
    }
}

export default Logout;