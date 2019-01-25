import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BottomNavigationBar from "../../../components/BottomNavigationBar";
import Loadable from "react-loadable";
import Loader from "../../../components/Loaders/component/Loader";

const HomeContainer = Loadable({
  loader: () => import("../Dashboard/Home/HomeContainer"),
  loading: Loader
});

const OrderContainer = Loadable({
  loader: () => import("../Dashboard/Order/OrderContainer"),
  loading: Loader
});

const Account = Loadable({
  loader: () => import("../Dashboard/Account/Account"),
  loading: Loader
});

const MainStep = Loadable({
  loader: () => import("../Dashboard/Step/MainStep"),
  loading: Loader
});

const OrderDetail = Loadable({
  loader: () => import("../Dashboard/Order/OrderDetail"),
  loading: Loader
});

const EditOrder = Loadable({
  loader: () => import("../Dashboard/Order/EditOrder"),
  loading: Loader
});

export default class MobileRoute extends Component {
  state = {
    selectedTab: "home"
  };

  onChangeTab = selectedTab => {
    // console.log('hello')
    this.setState({
      selectedTab: selectedTab
    });
  };

  render() {
    const currentPath = window.location.pathname;
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route exact path="/" component={HomeContainer} />
              <Route
                path="/order"
                render={props => (
                  <OrderContainer
                    {...props}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              />
              <Route
                path="/account"
                render={props => (
                  <Account {...props} isAuthenticated={isAuthenticated} />
                )}
              />
              <Route path="/form_login" component={MainStep} />
              <Route path="/orderdetail/:id" component={OrderDetail} />
              <Route path="/editorder/:id" component={EditOrder} />
            </Switch>
          )}
        />
        {!currentPath.includes("order") &&
        !currentPath.includes("account") &&
        !currentPath.includes("orderdetail") ? (
          <BottomNavigationBar
            selectedTab={this.state.selectedTab}
            onChangeTab={this.onChangeTab}
          />
        ) : null}
      </div>
    );
  }
}
