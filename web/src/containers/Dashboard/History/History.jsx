import React, { Component } from 'react';
import Navbar from '../../../components/Navbar';
import MonthlyContainer from './MonthlyContainer';

class History extends Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: '#e7e7e7',
					height: '100%',
					minHeight: '100vh'
				}}
			>
				<Navbar style={{ display: 'block', position: 'fixed' }} />
				<br />
				<br />
				<br />
				<MonthlyContainer />
			</div>
		);
	}
}

export default History;
