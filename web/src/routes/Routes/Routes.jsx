import React, { Component } from 'react';
import Loginpage from '../../containers/Landingpage/Loginpage';
import Forgotpassword from '../../containers/Landingpage/Forgotpassword';
import Signuppage from '../../containers/Landingpage/Signuppage';
import Homepage from '../../containers/Landingpage/Homepage';
import NotFound from '../../containers/Landingpage/NotFound';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './style/style.css';
export default class Routes extends Component {
	render() {
		return (
			<div>
				<Route
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition
								timeout={300}
								classNames="fadeLeft"
								mountOnEnter={true}
								unmountOnExit={true}
								key={location.key}
							>
								<Switch location={location}>
									<Route exact path="/" component={Homepage} />
									<Route exact path="/login" component={Loginpage} />
									<Route exact path="/signup" component={Signuppage} />
									<Route
										exact
										path="/forgot_pasword"
										component={Forgotpassword}
									/>

									<Route component={NotFound} />
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</div>
		);
	}
}
