import React, { Component } from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import BottomNavbar from "../../Components/BottomNavbar";
import Header from "../../Components/Header";

const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const HomeContainer = Loadable({
  loader: () => import("../../Containers/Dashboard/Home"),
  loading: loading
});

const HelpContainer = Loadable({
  loader: () => import("../../Containers/Dashboard/Help"),
  loading: loading
});

const OrdersContainer = Loadable({
  loader: () => import("../../Containers/Dashboard/Orders"),
  loading: loading
});

const AccountContainer = Loadable({
  loader: () => import("../../Containers/Dashboard/Account"),
  loading: loading
});

const StepLogin = Loadable({
  loader: () => import("../../Containers/Dashboard/StepLogin/Checkout"),
  loading: loading
});

class DashboardRoutes extends Component {
  state = {
    searchItem: "",
    data: [],
    orderData: [],
    visible: false
  };

  logout = () => {
    this.props.logoutFunc();
  };

  render() {
    return (
      <div>
        <Route exact path="/pick-trash" component={StepLogin} />
        <Header />
        <Route exact path="/home" component={HomeContainer} />
        <Route path="/orders" component={OrdersContainer} />
        <Route path="/help" component={HelpContainer} />
        <Route path="/account" component={AccountContainer} />
        <BottomNavbar />
      </div>
    );
  }
}

export default DashboardRoutes;
