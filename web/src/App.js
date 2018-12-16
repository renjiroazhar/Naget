import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import PrivateRoutes from './routes/PrivateRoutes';
import Routes from './routes/Routes/Routes';
import Lottie from 'lottie-react-web';
import Planet from './components/Loaders/json/planet_rotating.json';

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
		loading: true
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
		setTimeout(() => this.setState({ loading: false }), 1000);
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
		return isAuthenticated ? <PrivateRoutes /> : <Routes />;
		// return <AppNavigation />;
	}
}

export default App;
