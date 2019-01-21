import React, { Component } from "react";
import Loginpage from "../../Landingpage/Loginpage";
import Forgotpassword from "../../Landingpage/Forgotpassword";
import Signuppage from "../../Landingpage/Signuppage";
import Homepage from "../../Landingpage/Homepage";
import NotFound from "../../Landingpage/NotFound";
import { Route, Switch } from "react-router-dom";
export default class PublicRoute extends Component {
  render() {
    return (
      <div>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Loginpage} />
              <Route exact path="/signup" component={Signuppage} />
              <Route exact path="/forgot_password" component={Forgotpassword} />
              <Route component={NotFound} />
            </Switch>
          )}
        />
      </div>
    );
  }
}
