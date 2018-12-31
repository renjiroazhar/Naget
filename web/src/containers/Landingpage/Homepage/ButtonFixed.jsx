import React, { Component } from 'react';
import { Button } from 'react-materialize';

export default class ButtonFixed extends Component {
	render() {
		return (
			<div>
				<Button varian="contained"
					floating
					fab="vertical"
					icon="message"
					className="green"
					large
					style={{ bottom: '45px', right: '24px' }}
				>
					<Button varian="contained" floating icon="insert_chart" className="red" />
					<Button varian="contained" floating icon="format_quote" className="yellow darken-1" />
					<Button varian="contained" floating icon="publish" className="green" />
					<Button varian="contained" floating icon="attach_file" className="blue" />
				</Button>
			</div>
		);
	}
}
