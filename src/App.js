import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Logout';
import Navbar from './components/Navbar';
import './App.css';

function IsLoggedInRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Component {...routeProps} isLoggedIn={rest.isLoggedIn} />
      )}
    />
  );
}

function ToggleLoggedInRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Component {...routeProps} toggleLoggedIn={rest.toggleLoggedIn} />
      )}
    />
  );
}

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
    let routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <ToggleLoggedInRoute path="/auth" component={Auth} toggleLoggedIn={this.toggleLoggedIn} />
        <IsLoggedInRoute path="/" exact component={BurgerBuilder} isLoggedIn={this.state.isLoggedIn} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.state.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" render={() => <Logout toggleLoggedIn={this.toggleLoggedIn} />} />
          <ToggleLoggedInRoute path="/auth" component={Auth} toggleLoggedIn={this.toggleLoggedIn} />
          <IsLoggedInRoute path="/" exact component={BurgerBuilder} isLoggedIn={this.state.isLoggedIn} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <React.Fragment>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <main className="Content">
          { routes }
        </main>
      </React.Fragment>
    );
  }
}

export default App;
