import React, { Component } from 'react';
import { Button } from 'react-materialize';
import Icon from '@material-ui/core/Icon';
import './style/style.css';

export default class Tooltip extends Component {
	render() {
		return (
			<div>
				<Button
					floating
					fab="vertical"
					icon={<Icon size="26" >question_answer</Icon>}
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
