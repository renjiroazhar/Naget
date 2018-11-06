import React, { Component } from 'react';
import './App.css';
import SecondRoute from './routes/LandingpageRoute';
import Routes from './routes/DashboardRoute';
import { Redirect } from "react-router-dom";


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
      return <SecondRoute loginFunc={this.changeToLogin} />;
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
