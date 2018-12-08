import React, { Component } from 'react';
import './App.css';
import DashboardRoutes from './routes';
import WrappedNormalLoginForm from './containers/Landingpage/LoginContainer';
import { connect } from 'react-redux';

class App extends Component {
	render() {
		const { auth } = this.props;
		return auth.uid ? (
			<DashboardRoutes updateLogout={this.updateLogoutState} />
		) : (
			<WrappedNormalLoginForm updateLogin={this.updateLoginState} />
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		auth: state.firebase.auth
	};
};
export default connect(mapStateToProps)(App);
