import React, { Component } from 'react';
import './App.css';
import DashboardRoutes from './routes/DashboardRoutes';
import LandingpageRoutes from './routes/LandingpageRoutes';
import firebase from './services/firebaseConfig';

class App extends Component {
	state = {
		authUser: null
	};

	authListener = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					authUser: user
				});
			} else {
				this.setState({
					authUser: null
				});
			}
		});
	};

	componentDidMount() {
		this.authListener();
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { authUser } = this.state;
		return authUser ? (
			<DashboardRoutes updateLogout={this.updateLogoutState} />
		) : (
			<LandingpageRoutes />
		);
	}
}

export default App;
