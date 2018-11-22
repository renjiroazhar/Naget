import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import PageNotFound from "../PageNotFound";

const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const Homepage = Loadable({
  loader: () => import("../../Containers/Landingpage/Homepage"),
  loading: loading
});

const Loginpage = Loadable({
  loader: () => import("../../Containers/Landingpage/Loginpage"),
  loading: loading
});

const Signuppage = Loadable({
  loader: () => import("../../Containers/Landingpage/Signuppage"),
  loading: loading
});

const Forgotpassword = Loadable({
  loader: () => import("../../Containers/Landingpage/Forgotpassword"),
  loading: loading
});

const Checkout = Loadable({
  loader: () => import("../../Containers/Landingpage/Step/Checkout"),
  loading: loading
});

const TestimoniContainer = Loadable({
  loader: () => import("../../Containers/Landingpage/Testimoni"),
  loading: loading
});

const PencapaianContainer = Loadable({
  loader: () => import("../../Containers/Landingpage/Pencapaian"),
  loading: loading
});

const TampilanAwal = Loadable({
  loader: () => import("../../Containers/Landingpage/TampilanAwal"),
  loading: loading
});
export default class LandingpageRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Loginpage} />
          <Route path="/signup" component={Signuppage} />
          <Route path="/form" component={Checkout} />
          <Route path="/forgot_password" component={Forgotpassword} />
          <Route path="/testimoni" component={TestimoniContainer} />
          <Route path="/pencapaian" component={PencapaianContainer} />
          <Route path="/halaman_awal" component={TampilanAwal} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}
