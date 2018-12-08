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

export const signUp = newUser => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then(resp => {
				return firestore
					.collection('users')
					.doc(resp.user.uid)
					.set({
						name: newUser.name,
						phone: newUser.phone,
						address: newUser.address
					});
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch(err => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: 'SIGNOUT_SUCCESS' });
			});
	};
};
