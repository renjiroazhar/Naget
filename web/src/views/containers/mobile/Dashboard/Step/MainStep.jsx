import React, { Component } from "react";
import { StepLoginProvider } from "../../../../../context/StepLoginProvider";
import { Checkout } from "./Checkout";
export default class MainStep extends Component {
  render() {
    return (
      <div>
        <StepLoginProvider>
          <Checkout />
        </StepLoginProvider>
      </div>
    );
  }
}
