import { provider } from '../../services/firebaseConfig';
import { facebookProvider } from '../../services/firebaseConfig';
export const signIn = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch(err => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

export const signInWithGoogle = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(() => {
				dispatch({ type: 'GOOGLE_LOGIN_SUCCESS' });
			})
			.catch(err => {
				dispatch({ type: 'GOOGLE_LOGIN_ERROR', err });
			});
	};
};

export const signInWithFacebook = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithPopup(facebookProvider)
			.then(result => {
				dispatch({ type: 'FACEBOOK_LOGIN_SUCCESS' });
				console.log('Akses Token Bruh', result.credential.accessToken);
				console.log('User Id maybe', result.user);
			})

			.catch(err => {
				dispatch({ type: 'FACEBOOK_LOGIN_ERROR', err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const userId = getState().firebase.auth.uid;
		console.log('Keluar :(');
		firebase
			.auth()
			.signOut()
			.then(() => {
				firebase
					.firestore()
					.collection('status')
					.doc(userId)
					.set({
						status: 'offline',
						last_changed: firebase.firestore.FieldValue.serverTimestamp()
					});
				dispatch({ type: 'SIGNOUT_SUCCESS' });
			});
	};
};
