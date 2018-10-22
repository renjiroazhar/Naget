import React, { Component } from "react";

import { Route } from "react-router-dom";
import Loadable from "react-loadable";

const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const Homepage = Loadable({
  loader: () => import("../Homepage"),
  loading: loading
});

const Checkout = Loadable({
    loader: () => import("../Step/Checkout"),
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
              <Route exact path="/" component={Homepage} />
              <Route exact path="/form" component={Checkout} />
            </div>
         
    );
  }
}
