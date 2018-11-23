import React, { Component } from 'react';
import Lottie from 'lottie-react-web';
import Page404 from './json/404_page.json';

export default class PageNotFound extends Component {
  render() {
    return (
      <div style={{ marginTop: "200px" }}>
      <Lottie 
      width="400px" 
      height="400px"
          options={{
            animationData: Page404
          }}
        />
    </div>
    )
  }
}
