import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import PrivateRoute from './routes/private';
import PublicRoute from './routes/public';
import logo from './assets/img/moretrash.jpg';
// import Demo from './Demo';

class App extends Component {
	state = {
		isAuthenticated: null,
		loading: true
	};

	authListener = () => {
		const auth = firebase.auth().onAuthStateChanged(user => {
			if (user !== null || user !== []) {
				console.log(user);
				this.setState({
					isAuthenticated: user
				});
			} else {
				this.setState({
					isAuthenticated: null
				});
			}
		});
		return auth;
	};

	componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 1000);
		this.authListener();
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { loading, isAuthenticated } = this.state;
		if (loading) {
			return (
				<div style={cssInJs.loading}>
					<img src={logo} alt="splash-screen" width="175" height="45" />{' '}
				</div>
			);
		}
		return isAuthenticated ? <PrivateRoute /> : <PublicRoute />;
		// return <Demo />;
	}
}

const cssInJs = {
	loading: {
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',
		position: 'absolute'
	}
};

export default App;
