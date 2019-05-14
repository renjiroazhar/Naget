import React, { Component } from "react";
// import { Route, Switch } from "react-router-dom";
// import Navbar from "../../../components/Navbar";
// import Loadable from "react-loadable";
// import Loader from "../../../components/Loaders/component/Loader";
import ComingSoon from '../Dashboard/ComingSoon.jsx'

// const HomeContainer = Loadable({
//   loader: () => import("../Dashboard/Home/HomeContainer"),
//   loading: Loader
// });

export default class WebRoute extends Component {
  // state = {
  //   selectedTab: "home"
  // };

  render() {
    // const { isAuthenticated } = this.props;
    return (
      <div>
        {/* <Route
          render={({ location }) => (
            <Switch location={location}>
              <Navbar>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <HomeContainer
                      {...props}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                />
                <Route
                path="/account"
                render={props => (
                  <Account {...props} isAuthenticated={isAuthenticated} />
                )}
              />
              </Navbar>
            </Switch>
          )}
        /> */}
        <ComingSoon />
      </div>
    );
  }
}
