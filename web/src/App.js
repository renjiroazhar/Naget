import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import PrivateRoute from './routes/private';
import PublicRoute from './routes/public';
import Lottie from 'lottie-react-web';
import Planet from './component/Loaders/json/planet_rotating.json';

const Loading = () => (
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

class App extends Component {
	state = {
		isAuthenticated: null,
		loading: false
	};

	authListener = () => {
		const auth = firebase.auth().onAuthStateChanged(user => {
			if (user !== null || user !== []) {
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
		// setTimeout(() => this.setState({ loading: false }), 1000);
		this.authListener();
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { loading, isAuthenticated } = this.state;
		if (loading) {
			return <Loading />;
		}
		return isAuthenticated ? <PrivateRoute /> : <PublicRoute />;
	}
}

export default App;
