import React, { Component } from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import BottomNavbar from "../../Components/BottomNavbar";
import Header from "../../Components/Header";
import Lottie from "lottie-react-web";
import Planet from "./json/planet_rotating.json";

const loading = () => (
  <div style={{ marginTop: "200px" }}>
    <Lottie
      width="200px"
      height="200px"
      options={{
        animationData: Planet
      }}
    />
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
        <div>
          <Route path="/pick-trash" component={StepLogin} />
          <Header />
          <Route exact path="/home" component={HomeContainer} />
          <Route path="/orders" component={OrdersContainer} />
          <Route path="/help" component={HelpContainer} />
          <Route path="/account" component={AccountContainer} />
          <BottomNavbar />
        </div>
      </div>
    );
  }
}

export default DashboardRoutes;
