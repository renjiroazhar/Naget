import React, { Component } from "react";
import './App.css';
import Loadable from "react-loadable";
import Lottie from 'lottie-react-web';
import Planet from './planet_rotating.json';

const loading = () => (
  <div style={{ marginTop: "200px" }}>
    <Lottie 
    width="200px" 
    height="200px"
        options={{
          animationData: Planet
        }}
      />
  </div>
);

const Routes = Loadable({
  loader: () => import("./Routes/AuthenticationRoute"),
  loading: loading
});

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
