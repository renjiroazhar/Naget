import React from 'react';
import { connect } from 'react-redux';
import DashboardRoutes from '../DashboardRoute';
import LandingpageRoutes from '../LandingpageRoute';
import { BrowserRouter } from 'react-router-dom';

const Routes = props => {
	const { auth } = props;
	const links = auth.uid ? (
		<div>
			<BrowserRouter>
				<div>
					<DashboardRoutes />
				</div>
			</BrowserRouter>
		</div>
	) : (
		<div>
			<BrowserRouter>
				<div>
					<LandingpageRoutes />
				</div>
			</BrowserRouter>
		</div>
	);
	return <div>{links}</div>;
};

const mapStateToProps = state => {
	console.log(state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(Routes);
