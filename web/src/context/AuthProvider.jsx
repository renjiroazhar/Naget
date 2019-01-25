import React, { Component, createContext } from "react";
import firebase from "../services/firebaseConfig";

export const AuthContext = createContext();
const { Provider } = AuthContext;

export default class AuthProvider extends Component {
  state = {
    isAuthenticated: null,
    loading: true,
    isMounted: false
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
    console.log("Mounted");
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
