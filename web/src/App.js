import React, { Component } from 'react';
import PrivateRoute from './containers/mobile/routes/private';
import PublicRoute from './containers/mobile/routes/public';
import logo from './assets/img/svg/logonaget2.svg';
import { hot } from 'react-hot-loader';
import { AuthContext } from './containers/mobile/context/AuthProvider';
import { cssInJs } from './assets/style/splashScreen';

class App extends Component {
  render() {
    const { loading, isAuthenticated } = this.context.state;
    if (loading) {
      return (
        <div style={cssInJs.backgroundLoading}>
          <div style={cssInJs.loading}>
            <img src={logo} alt="splash-screen" width="175" height="45" />{' '}
          </div>
        </div>
      );
    }
    return isAuthenticated ? <PrivateRoute /> : <PublicRoute />;
  }
}

App.contextType = AuthContext;

export default hot(module)(App);
