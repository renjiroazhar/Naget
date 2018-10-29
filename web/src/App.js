import React, { Component } from 'react';
import './App.css';
import Homepage from './Homepage';
import Routes from './Routes';

class App extends Component {
   
  state = {
    login : null
  }

  render() {

    if(!this.state.login){
      return <Homepage />;
    }


    return <Routes />;
  }
}
 

export default App;
