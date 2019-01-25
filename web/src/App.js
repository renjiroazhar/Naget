import React, { Component } from "react";
import MobileRoute from "./views/containers/mobile/MobileRoute";
import WebRoute from "./views/containers/web/WebRoute";
import { isMobile } from "react-device-detect";
import logo from "./assets/img/svg/logonaget2.svg";
import { hot } from "react-hot-loader";
import { cssInJs } from "./assets/style/splashScreen";
import { AuthContext } from "./context/AuthProvider";

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
    if (isMobile) {
      return <MobileRoute isAuthenticated={isAuthenticated} />;
    }

    return <WebRoute isAuthenticated={isAuthenticated} />;
  }
}

App.contextType = AuthContext;

export default hot(module)(App);
