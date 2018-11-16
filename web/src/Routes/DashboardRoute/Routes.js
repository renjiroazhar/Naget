import React, { Component } from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import BottomNavbar from '../../Components/BottomNavbar';
import Header from '../../Components/Header';


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

const Checkout = Loadable({
    loader: () => import("../../Containers/Dashboard/StepLogin/Checkout"),
    loading: loading
  });

const FaqContainer = Loadable({
  loader: () => import("../../Containers/Dashboard/Faq"),
  loading: loading
});

const HistoryContainer = Loadable({
  loader: () => import("../../Containers/Dashboard/History"),
  loading: loading
});

const AccountContainer = Loadable({
    loader: () => import("../../Containers/Dashboard/Account"),
    loading: loading
  });

 
class Routes extends Component {
  
  state = {
    searchItem: "",
    data: [],
    orderData : [],
    visible: false
  };

  logout = () => {
    this.props.logoutFunc();
}

  render() {
    return (
            <div>
              <Route path="/pick-thrash" component={Checkout} />
              <Header />
              <Route exact path="/home" component={HomeContainer} />
              <Route path="/history" component={HistoryContainer} />
              <Route path="/faq" component={FaqContainer} />
              <Route exact path="/account" render={()=> <AccountContainer FunctionLogout={this.logout}/>}/>
              <BottomNavbar />            
            </div>
         
    );
  }
}



export default Routes;