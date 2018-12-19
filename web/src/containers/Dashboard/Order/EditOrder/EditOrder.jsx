import React, { Component } from 'react';
import { Page } from 'react-onsenui';
import OrderDetail from '../OrderDetail/OrderDetail';
export default class EditOrder extends Component {
	componentDidMount() {
		console.log(this.props);
	}
	pushPage() {
		this.props.navigator.pushPage({
			component: OrderDetail
		});
	}

	render() {
		return (
			<Page>
				<p>Edit Page </p>
				<p>Id : {this.props.idItem}</p>
				<button
					onClick={() => {
						this.props.navigator.popPage();
					}}
				>
					Back
				</button>
			</Page>
		);
	}
}
