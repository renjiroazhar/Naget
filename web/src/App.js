import React, { Component } from 'react';
import './App.css';
import SecondRoute from './Routes/LandingpageRoute';
import Routes from './Routes/DashboardRoute';
import { Redirect } from "react-router-dom";
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOSCJRqiVBlknPm5MT99eHXkLhVAHHQWs",
  authDomain: "more-thrash.firebaseapp.com",
  databaseURL: "https://more-thrash.firebaseio.com",
  projectId: "more-thrash",
  storageBucket: "more-thrash.appspot.com",
  messagingSenderId: "884093458579"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

class App extends Component {
   
  state = {
    redirect : false
  }

  changeToLogin = () => {
    let aksesToken = "123456789";
    sessionStorage.setItem("accessToken", aksesToken);
    this.setState({
      redirect : true,
    })
  }

  changeToLogout = () => {
    sessionStorage.clear();
  }

  render() {
    let aksesToken = sessionStorage.getItem("accessToken");
    if(!aksesToken){
      return (<div style={{width : "100%",margin: 0, pading: 0}}><SecondRoute loginFunc={this.changeToLogin} /></div>);
    } else {
      return (<div className="App">     
      <Routes logoutFunc={this.changeToLogout}/>
      {this.state.redirect ? (<Redirect to="/home"/>):("")}
      </div>
      )
    }
  }
  
}
 
export default App;
