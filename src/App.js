import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Logout';
import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
  state = {
    isLoggedIn: false
  }

  toggleLoggedIn = () => {
    console.log(localStorage.getItem('token'));
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <main className="Content">
          <Switch>
            <Route path="/checkout" component={Checkout} />
            {this.state.isLoggedIn ? <Route path="/orders" component={Orders} /> : null}
            {!this.state.isLoggedIn 
            ? <Route path="/auth" render={() => <Auth toggleLoggedIn={this.toggleLoggedIn} />} />
            : <Route path="/logout" render={() => <Logout toggleLoggedIn={this.toggleLoggedIn} />} />}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
