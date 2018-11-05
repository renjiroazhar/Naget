import React, { Component } from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import BottomNavbar from '../Components';
import Header from '../Components/Header';


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