import React, { Component } from 'react';
import { Toolbar, Icon, ToolbarButton } from 'react-onsenui';

// load Onsen UI library
import ons from 'onsenui';

export default class ToolbarComponent extends Component {
	render() {
		let toolbarButton;

		if (!ons.platform.isAndroid()) {
			toolbarButton = (
				<ToolbarButton onClick={this.signIn} style={{ fontSize: '24px' }}>
					<Icon
						style={{ lineHeight: '56px', color: '#000000' }}
						icon={{ default: 'md-account-o' }}
					/>
				</ToolbarButton>
			);
		}
		return (
			<div class="tile">
				<Toolbar style={{ height: '56px' }}>
					<div className="left" style={{ lineHeight: '56px' }}>
						Moretrash
					</div>

					<div className="right">{toolbarButton}</div>
				</Toolbar>
				/>
			</div>
		);
	}
}
