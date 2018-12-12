import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Navbar from '../../../components/Navbar';
import { List } from 'antd-mobile';
import HistoryList from './HistoryList';

const Item = List.Item;
const Brief = Item.Brief;

class HistoryContainer extends Component {
	render() {
		const { orders } = this.props;
		return (
			<div
				style={{
					backgroundColor: '#e7e7e7',
					height: '100%',
					minHeight: '100vh'
				}}
			>
				<Navbar style={{ display: 'block', position: 'fixed' }} />
				<br />
				<br />
				<br />
				<div>
					<div>
						<h2
							style={{ color: '#16a085', textAlign: 'center', margin: '15px' }}
						>
							HISTORY
						</h2>
					</div>
					<List className="my-list">
						<Item
							arrow="horizontal"
							thumb={
								<img
									src="https://s.republika.co.id/uploads/images/inpicture_slide/sampah-plastik-ilustrasi-_140624142449-730.jpg"
									alt=""
									style={{
										width: '50px',
										height: '50px'
									}}
									width="50px"
									height="50px"
								/>
							}
							multipleLine
							onClick={() => {}}
						>
							Title <Brief>subtitle</Brief>
						</Item>
					</List>
				</div>

				<HistoryList orders={orders} />
				<br />
				<br />
				<br />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.firestore.ordered.orders
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{
			collection: 'orders'
		}
	])
)(HistoryContainer);
