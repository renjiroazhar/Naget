import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import PrivateRoute from './routes/private';
import PublicRoute from './routes/public';
import logo from './assets/png/logo.png';
import { hot } from 'react-hot-loader';
// import Demo from './Demo';

class App extends Component {
	state = {
		isAuthenticated: null,
		loading: true,
		isMounted: false
	};

	statePersistence = userId => {
		firebase
			.database()
			.ref('.info/connected')
			.on('value', function(snapshot) {
				console.log(snapshot.val());
				if (snapshot.val() === false || !snapshot.val()) {
					console.log('offline', !snapshot.val());
					firebase
						.firestore()
						.collection('status')
						.doc(userId)
						.set({
							status: 'offline',
							last_changed: firebase.firestore.FieldValue.serverTimestamp()
						});
				}

				firebase
					.database()
					.ref('/status/' + userId)
					.onDisconnect()
					.set({
						status: 'offline',
						last_changed: firebase.firestore.FieldValue.serverTimestamp()
					})
					.then(() => {
						firebase
							.database()
							.ref('/status/' + userId)
							.set({
								status: 'online',
								last_changed: firebase.firestore.FieldValue.serverTimestamp()
							});
						// We'll also add Firestore set here for when we come online.
						firebase
							.firestore()
							.collection('status')
							.doc(userId)
							.set({
								status: 'online',
								last_changed: firebase.firestore.FieldValue.serverTimestamp()
							});
					});
			});
	};

	authListener = () => {
		const auth = firebase.auth().onAuthStateChanged(user => {
			if (this.state.isMounted) {
				if (user && user !== null) {
					this.setState({
						isAuthenticated: user
					});
					this.statePersistence(user.uid);
				} else {
					this.setState({
						isAuthenticated: null
					});
				}
			}
		});
		return auth;
	};

	componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 500);
		this.setState({
			isMounted: true
		});
		this.authListener();
		console.log('Aaaa');
	}

	componentWillUnmount() {
		this.setState({
			isMounted: false
		});
	}

	render() {
		const { loading, isAuthenticated } = this.state;
		if (loading) {
			return (
				<div style={cssInJs.backgroundLoading}>
					<div style={cssInJs.loading}>
						<img src={logo} alt="splash-screen" width="175" height="45" />{' '}
					</div>
				</div>
			);
		}
		return isAuthenticated ? <PrivateRoute /> : <PublicRoute />;
	}
}

const cssInJs = {
	loading: {
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',
		position: 'absolute'
	},
	backgroundLoading: {
		height: '100%',
		minHeight: '100vh',
		overflow: 'hidden',
		backgroundColor: '#f5f5f5'
	}
};

export default hot(module)(App);
