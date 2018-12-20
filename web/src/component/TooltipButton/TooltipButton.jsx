import React, { Component } from 'react';
import { Fab, SpeedDial, SpeedDialItem, Icon } from 'react-onsenui';

export default class TooltipButton extends Component {
	render() {
		return (
			<div
				style={{
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					overflowY: 'auto'
				}}
			>
				<SpeedDial
					disabled={false}
					direction="up"
					onClick={() => console.log('test1')}
					position="right bottom"
					style={{ position: 'absolute !important' }}
				>
					<Fab style={{ backgroundColor: '#00c43e' }}>
						<Icon
							icon="ion-chatboxes"
							size={26}
							fixedWidth={false}
							style={{ verticalAlign: 'middle' }}
						/>
					</Fab>
					<SpeedDialItem onClick={() => console.log('speed A')}>
						{' '}
						A{' '}
					</SpeedDialItem>
					<SpeedDialItem onClick={() => console.log('speed B')}>
						{' '}
						B{' '}
					</SpeedDialItem>
					<SpeedDialItem onClick={() => console.log('speed C')}>
						{' '}
						C{' '}
					</SpeedDialItem>
					<SpeedDialItem onClick={() => console.log('speed D')}>
						{' '}
						D{' '}
					</SpeedDialItem>
				</SpeedDial>
			</div>
		);
	}
}
