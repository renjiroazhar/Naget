import React, { Component } from 'react';
import { Tabbar, Tab } from 'react-onsenui';

import HomeNavigation from '../../containers/Dashboard/Home/HomeNavigation';
import Help from '../../containers/Dashboard/Help/';
import Account from '../../containers/Dashboard/Account/';
import OrderNavigation from '../../containers/Dashboard/Order/OrderNavigation';

export default class AppExample extends Component {
	//	navigator;

	renderTabs() {
		return [
			{
				content: <HomeNavigation />,
				tab: <Tab label="Home" icon="md-home" />
			},
			{
				content: <OrderNavigation />,
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
				initialRoute={{ component: HomeNavigation }}
				renderTabs={this.renderTabs.bind(this)} //<-- *** I changed here.
			/>
		);
	}
}
