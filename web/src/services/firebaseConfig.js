import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOSCJRqiVBlknPm5MT99eHXkLhVAHHQWs",
  authDomain: "more-thrash.firebaseapp.com",
  databaseURL: "https://more-thrash.firebaseio.com",
  projectId: "more-thrash",
  storageBucket: "more-thrash.appspot.com",
  messagingSenderId: "884093458579"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;