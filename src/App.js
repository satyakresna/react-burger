import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Logout';
import Navbar from './components/Navbar';
import './App.css';

function LoggedInRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Component {...routeProps} {...rest} />
      )}
    />
  );
}

class App extends Component {
  state = {
    isLoggedIn: false,
    setAuthRedirectPath: '/'
  }

  toggleLoggedIn = () => {
    // console.log(localStorage.getItem('token'));
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }

  onSetAuthRedirectPath = (path) => {
    this.setState({
      setAuthRedirectPath: path
    });
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <LoggedInRoute path="/auth" component={Auth} 
          toggleLoggedIn={this.toggleLoggedIn} 
          isLoggedIn={this.state.isLoggedIn} 
          onSetAuthRedirectPath={this.onSetAuthRedirectPath} 
          setAuthRedirectPath={this.state.setAuthRedirectPath} />
        <LoggedInRoute path="/" exact component={BurgerBuilder} isLoggedIn={this.state.isLoggedIn} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.state.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" render={() => <Logout toggleLoggedIn={this.toggleLoggedIn} />} />
          <LoggedInRoute path="/auth" component={Auth} 
            toggleLoggedIn={this.toggleLoggedIn} 
            isLoggedIn={this.state.isLoggedIn} 
            onSetAuthRedirectPath={this.onSetAuthRedirectPath} 
            setAuthRedirectPath={this.state.setAuthRedirectPath} />
          <LoggedInRoute path="/" exact component={BurgerBuilder} isLoggedIn={this.state.isLoggedIn} />
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
