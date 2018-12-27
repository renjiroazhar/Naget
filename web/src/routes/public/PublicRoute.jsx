import React, { Component } from 'react';
import Loginpage from '../../containers/Landingpage/Loginpage';
import Forgotpassword from '../../containers/Landingpage/Forgotpassword';
import Signuppage from '../../containers/Landingpage/Signuppage';
import Homepage from '../../containers/Landingpage/Homepage';
import NotFound from '../../containers/Landingpage/NotFound';
import { Route, Switch } from 'react-router-dom';
import Checkout from '../../containers/Landingpage/Step/Checkout';
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
							<Route exact path="/form" component={Checkout} />
							<Route component={NotFound} />
						</Switch>
					)}
				/>
			</div>
		);
	}
}
