import React, { Component } from 'react';
import { Button } from 'react-materialize';

export default class ButtonFixed extends Component {
	render() {
		return (
			<div>
				<Button
					floating
					fab="vertical"
					icon="message"
					className="green"
					large
					style={{ bottom: '45px', right: '24px' }}
				>
					<Button floating icon="insert_chart" className="red" />
					<Button floating icon="format_quote" className="yellow darken-1" />
					<Button floating icon="publish" className="green" />
					<Button floating icon="attach_file" className="blue" />
				</Button>
			</div>
		);
	}
}
