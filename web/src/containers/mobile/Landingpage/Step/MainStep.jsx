import React, { Component } from 'react';
import { StepProvider } from '../../context/StepProvider';
import { Checkout } from './Checkout';
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
