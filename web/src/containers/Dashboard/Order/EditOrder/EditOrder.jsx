import React, { Component } from 'react';
import { Page } from 'react-onsenui';
export default class EditOrder extends Component {
	componentDidMount() {
		console.log(this.props);
	}
	render() {
		return (
			<Page>
				<p>Edit Page</p>
			</Page>
		);
	}
}
