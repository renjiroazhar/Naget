import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import PageNotFound from "./PageNotFound";
const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const Homepage = Loadable({
  loader: () => import("../Frontpage/Homepage"),
  loading: loading
});

const Loginpage = Loadable({
  loader: () => import("../Frontpage/Loginpage"),
  loading: loading
});

const Signuppage = Loadable({
  loader: () => import("../Frontpage/Signuppage"),
  loading: loading
});

const Forgotpassword = Loadable({
    loader: () => import("../Frontpage/Forgotpassword"),
    loading: loading
  });
  
const Checkout = Loadable({
    loader: () => import("../Containers/Step/Checkout"),
    loading: loading
  });

export default class NewRoutes extends Component {
  
  state = {
    searchItem: "",
    data: [],
    orderData : [],
    visible: false
  };

  login = () => {
      this.props.loginFunc();
  }

  render() {
    return (
            <div>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/login" render={()=> <Loginpage loginFunction={this.login}/>} />
                <Route path="/signup" component={Signuppage} />
                <Route path="/form" component={Checkout} />
                <Route exact path="/forgot_password" component={Forgotpassword} />    
                <Route component={PageNotFound} />  
            </Switch>
            </div>
         
    );
  }
}
