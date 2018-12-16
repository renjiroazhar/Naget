import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import PrivateRoutes from './routes/PrivateRoutes';
import Routes from './routes/Routes/Routes';
class App extends Component {
	state = {
		isAuthenticated: null
	};

	authListener = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					isAuthenticated: user
				});
			} else {
				this.setState({
					isAuthenticated: null
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
		const { isAuthenticated } = this.state;
		return isAuthenticated ? <PrivateRoutes /> : <Routes />;
		// return <AppNavigation />;
	}
}

export default App;
