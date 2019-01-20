import React, { Component } from "react";
import PrivateRoute from "./views/containers/mobile/routes/private";
import PublicRoute from "./views/containers/mobile/routes/public";
import logo from "./assets/img/svg/logonaget2.svg";
import { hot } from "react-hot-loader";
import { AuthContext } from "./views/containers/mobile/context/AuthProvider";
import { cssInJs } from "./assets/style/splashScreen";

class App extends Component {
  render() {
    const { loading, isAuthenticated } = this.context.state;
    if (loading) {
      return (
        <div style={cssInJs.backgroundLoading}>
          <div style={cssInJs.loading}>
            <img src={logo} alt="splash-screen" width="400" height="200" />{" "}
          </div>
        </div>
      );
    }
    return isAuthenticated ? (
      <PrivateRoute isAuthenticated={isAuthenticated} />
    ) : (
      <PublicRoute />
    );
  }
}

App.contextType = AuthContext;

export default hot(module)(App);
