import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import firebase from "firebase";
import LoginPage from "views/LoginPage/LoginPage.jsx";
class MainApp extends Component {
  state = {
    isAuthenticated: null,
    loading: false,
    isInvalid: null
  };

  authListener = () => {
    const auth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Logged IN!");

        if (user.emailVerified) {
          console.log("Email is verified");
          this.setState({
            isAuthenticated: user
          });
        } else {
          console.log("Email is not verified");
          this.setState({
            isAuthenticated: null,
            isInvalid: "Sorry , your Account is Not Verified"
          });

          setTimeout(() => {
            this.setState({
              isInvalid: null
            });
          }, 5000);
          firebase.auth().signOut();
          console.log("Keluar.....");
        }
      } else {
        this.setState({
          isAuthenticated: null
        });
      }
    });
    return auth;
  };

  async componentDidMount() {
    // setTimeout(() => this.setState({ loading: false }), 1000);
    await this.authListener();
  }

  async componentWillUnmount() {
    await this.authListener();
  }

  render() {
    const { loading, isAuthenticated, isInvalid } = this.state;
    if (loading) {
      return <p>Loading..</p>;
    }
    return isAuthenticated ? (
      <div>
        <div>
          <Switch>
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </div>
      </div>
    ) : (
      <div>
        <LoginPage isInvalid={isInvalid} />
      </div>
    );
  }
}

export default MainApp;
