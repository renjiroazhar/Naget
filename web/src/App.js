import React, { Component } from 'react';
import './App.css';
import NewRoutes from './Routes/NewRoutes';
import Routes from './Routes';
import { Redirect } from "react-router-dom";


class App extends Component {
   
  state = {
    redirect : false,
    login : null
  }

  changeToLogin = () => {
    let aksesToken = "123456789";
    sessionStorage.setItem("accessToken", aksesToken);
    this.setState({
      redirect : true,
      login : true
    })
  }

  changeToLogout = () => {
    sessionStorage.clear();
    this.setState({
      login: false
    });
  }

  render() {
    let aksesToken = sessionStorage.getItem("accessToken");
   
    if(!aksesToken){
      return <NewRoutes loginFunc={this.changeToLogin} />;
    }
    return (<div className="App">
    
          
      <Routes logoutFunc={this.changeToLogout}/>
      {this.state.redirect ? (<Redirect to="/home"/>):("")}
      </div>
      )
  }
  
}
 



export default App;
