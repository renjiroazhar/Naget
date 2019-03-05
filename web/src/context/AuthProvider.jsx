import React, { Component, createContext } from 'react';

export const AuthContext = createContext();
const { Provider } = AuthContext;

export default class AuthProvider extends Component {
  state = {
    isAuthenticated: null,
    loading: true,
    isMounted: false
  };

  authListener = () => {
    if (this.state.isMounted) {
      if (localStorage.getItem('email')) {
        this.setState({
          isAuthenticated: 'root'
        });
      } else {
        this.setState({
          isAuthenticated: null
        });
      }
    }
  };

  componentDidMount() {
    console.log(localStorage.getItem('email'));
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
      console.log(this.state),
      (
        <Provider
          value={{
            state: this.state
          }}
        >
          {this.props.children}
        </Provider>
      )
    );
  }
}
