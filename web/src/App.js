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

  changeToLogin = () => (
    this.setState({
      redirect : true,
      login : true
    })
  )

  changeToLogout = () => {
    this.setState({
      login: false
    })
  }

  render() {

   
    if(!this.state.login){
      return <NewRoutes loginFunc={this.changeToLogin} />;
    }
    return (<div className="App">
          <div style={{display: "block",
    margin: "0 auto"}} >
          <img src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png" srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x" width="171" height="50" alt="Moretrash Logo" retina_logo_url="" className="fusion-standard-logo" style={{display: "block",
    margin: "0 auto"}}   />
          </div>
      <Routes logoutFunc={this.changeToLogout}/>
      {this.state.redirect ? (<Redirect to="/home"/>):("")}
      </div>);

  }
  
}
 


export default App;
