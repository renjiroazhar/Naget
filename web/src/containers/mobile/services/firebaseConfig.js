import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyB1f4yOvyNxoqJmlJMolWlmMo55kG1Ua7U',
	authDomain: 'naget.id.firebaseapp.com',
	projectId: 'naget-id',
	messagingSenderId: '1064238517604'
};

firebase.initializeApp(config);

export const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	]
};

export const provider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;
