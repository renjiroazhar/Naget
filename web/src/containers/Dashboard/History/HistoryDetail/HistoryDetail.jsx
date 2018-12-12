import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Navbar from '../Navbar';

const HistoryDetail = props => {
	const { order } = props;

	if (order) {
		return (
			console.log(order),
			(
				<div>
					<Navbar />
					<p>Horaay Datanya ada...</p>
				</div>
			)
		);
	} else {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const orders = state.firestore.data.orders;
	const order = orders ? orders[id] : null;
	return {
		order: order
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'orders' }])
)(HistoryDetail);
