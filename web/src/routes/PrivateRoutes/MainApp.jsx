import React, { Component } from 'react';
import { Tabbar, Tab } from 'react-onsenui';

import HomeNavigation from '../../containers/Dashboard/Home/HomeNavigation';
import Help from '../../containers/Dashboard/Help/';
import Account from '../../containers/Dashboard/Account/';
import OrderNavigation from '../../containers/Dashboard/Order/OrderNavigation';
import './style/style.css';
export default class MainApp extends Component {
	//	navigator;
	state = {
		visibility: true
	};

	changeVisibilityFalse = () => {
		this.setState({
			visibility: false
		});
	};

	changeVisibilityTrue = () => {
		this.setState({
			visibility: true
		});
	};

	renderTabs() {
		return [
			{
				content: (
					<HomeNavigation
						changeVisibilityFalse={this.changeVisibilityFalse}
						changeVisibilityTrue={this.changeVisibilityTrue}
					/>
				),
				tab: <Tab label="Home" active={true} icon="md-home" />
			},
			{
				content: (
					<OrderNavigation
						changeVisibilityFalse={this.changeVisibilityFalse}
						changeVisibilityTrue={this.changeVisibilityTrue}
					/>
				),
				tab: <Tab label="Order" icon="md-assignment" />
			},
			{
				content: <Help />,
				tab: <Tab label="Help" icon="md-help" />
			},
			{
				content: <Account renderTabs={() => this.renderTabs()} />,
				tab: <Tab label="Account" icon="ion-person" />
			}
		];
	}

	render() {
		return (
			<Tabbar
				onPostChange={() => console.log('postChange')}
				onReactive={() => console.log('postChange')}
				initialRoute={{ component: HomeNavigation }}
				renderTabs={this.renderTabs.bind(this)} //<-- *** I changed here.
				position="bottom"
				visible={this.state.visibility}
			/>
		);
	}
}
