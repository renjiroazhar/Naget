import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { Icon } from 'react-onsenui';

export default class Tooltip extends Component {
	render() {
		return (
			<div>
				<Button
					floating
					fab="vertical"
					icon={
						<Icon
							icon="ion-chatboxes"
							size={26}
							fixedWidth={false}
							style={{ verticalAlign: 'middle' }}
						/>
					}
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
