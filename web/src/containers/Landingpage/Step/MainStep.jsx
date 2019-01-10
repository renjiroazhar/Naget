import React, { Component } from 'react';
import { StepProvider } from '../../../context/StepProvider';
import { Checkout } from './Checkout';

//Main Step Container Include Context
//I use context to refactor my code

export default class MainStep extends Component {
	render() {
		return (
			<div>
				<StepProvider>
					<Checkout />
				</StepProvider>
			</div>
		);
	}
}
