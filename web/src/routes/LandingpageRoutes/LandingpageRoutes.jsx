import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router';
import Lottie from 'lottie-react-web';
import Planet from '../json/planet_rotating.json';

const loading = () => (
	<div style={{ marginTop: '200px' }}>
		<Lottie
			width="200px"
			height="200px"
			options={{
				animationData: Planet
			}}
		/>
	</div>
);

const Loginpage = Loadable({
	loader: () => import('../../containers/Landingpage/Loginpage'),
	loading: loading
});

const Signuppage = Loadable({
	loader: () => import('../../containers/Landingpage/Signuppage'),
	loading: loading
});

const Forgotpassword = Loadable({
	loader: () => import('../../containers/Landingpage/Forgotpassword'),
	loading: loading
});

class DashboardRoutes extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Loginpage} />
				<Route exact path="/signup" component={Signuppage} />
				<Route exact path="/forgot_password" component={Forgotpassword} />
			</div>
		);
	}
}

export default DashboardRoutes;
