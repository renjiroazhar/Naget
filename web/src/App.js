import React, { Component } from "react";
import "./App.css";
// import LandingpageRoute from "./Routes/LandingpageRoute";
// import DashboardRoute from "./Routes/DashboardRoute";
// import { Redirect, BrowserRouter } from "react-router-dom";
import Routes from "./Routes/AuthenticationRoute";

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
