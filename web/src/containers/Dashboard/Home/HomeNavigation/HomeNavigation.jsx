import React from 'react';
import { Navigator } from 'react-onsenui';

import HomeContainer from '../HomeContainer/HomeContainer';

export default class HomeNavigation extends React.Component {
	renderPage(route, navigator) {
		const props = route.props || {};
		props.navigator = navigator;

		return React.createElement(route.component, props);
	}

	render() {
		return (
			<Navigator
				initialRoute={{ component: HomeContainer }}
				renderPage={this.renderPage}
			/>
		);
	}
}
