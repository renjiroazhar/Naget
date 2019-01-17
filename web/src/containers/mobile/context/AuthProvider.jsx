import React, { Component, createContext } from 'react';
import firebase from '../services/firebaseConfig';

export const AuthContext = createContext();
const { Provider } = AuthContext;

export default class AuthProvider extends Component {
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
    setTimeout(() => this.setState({ loading: false }), 750);
    this.setState({
      isMounted: true
    });
    this.authListener();
    console.log('Mounted');
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    return (
      <Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
