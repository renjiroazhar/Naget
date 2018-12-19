import React, { Component } from 'react';
import { Tabbar, Tab } from 'react-onsenui';
import FirstTabbar from './FirstTabbar';
import SecondTabbar from './SecondTabbar';
export default class MainApp extends Component {
	//	navigator;

	renderTabs() {
		return [
			{
				content: <FirstTabbar />,
				tab: <Tab label="Home" icon="md-home" />
			},
			{
				content: <SecondTabbar />,
				tab: <Tab label="Order" icon="md-assignment" />
			}
		];
	}

	render() {
		return (
			<Tabbar
				initialRoute={{ component: FirstTabbar }}
				renderTabs={this.renderTabs.bind(this)} //<-- *** I changed here.
				position="top"
			/>
		);
	}
}
