import React from 'react';
import { Navigator } from 'react-onsenui';

import OrderContainer from '../OrderContainer/OrderContainer';

export default class OrderNavigation extends React.Component {
	renderPage(route, navigator) {
		const props = route.props || {};
		props.navigator = navigator;

		return React.createElement(route.component, props);
	}

	render() {
		return (
			<Navigator
				initialRoute={{
					component: OrderContainer,
					props: {
						changeVisibilityFalse: () => this.props.changeVisibilityFalse(),
						changeVisibilityTrue: () => this.props.changeVisibilityTrue()
					}
				}}
				renderPage={this.renderPage}
			/>
		);
	}
}
