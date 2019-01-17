import React, { Component } from 'react';
import Loginpage from '../../Landingpage/Loginpage';
import Forgotpassword from '../../Landingpage/Forgotpassword';
import Signuppage from '../../Landingpage/Signuppage';
import Homepage from '../../Landingpage/Homepage';
import NotFound from '../../Landingpage/NotFound';
import { Route, Switch } from 'react-router-dom';
import MainStep from '../../Landingpage/Step/MainStep';
export default class PublicRoute extends Component {
  render() {
    return (
      <div>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route exact path="/" component={Homepage} />
              <Route path="/login" component={Loginpage} />
              <Route path="/signup" component={Signuppage} />
              <Route path="/forgot_password" component={Forgotpassword} />
              <Route path="/form" component={MainStep} />
              <Route component={NotFound} />
            </Switch>
          )}
        />
      </div>
    );
  }
}
