import React, { Component } from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import BottomNavbar from '../Components';

const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const HomeContainer = Loadable({
  loader: () => import("../Containers/Home"),
  loading: loading
});

const FaqContainer = Loadable({
  loader: () => import("../Containers/Faq"),
  loading: loading
});

const HistoryContainer = Loadable({
  loader: () => import("../Containers/History"),
  loading: loading
});

const AccountContainer = Loadable({
    loader: () => import("../Containers/Account"),
    loading: loading
  });

export default class Routes extends Component {
  
  state = {
    searchItem: "",
    data: [],
    orderData : [],
    visible: false
  };

  render() {
    return (
            <div>
              <Route exact path="/home" component={HomeContainer} />
              <Route path="/history" component={HistoryContainer} />
              <Route path="/faq" component={FaqContainer} />
              <Route exact path="/account" component={AccountContainer} />
              <BottomNavbar />            
            </div>
         
    );
  }
}
