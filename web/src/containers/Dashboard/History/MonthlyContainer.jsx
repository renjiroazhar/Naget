import React, { Component } from 'react';
import { List } from 'antd-mobile';
import firebase from '../../../services/firebaseConfig';

const Item = List.Item;
const Brief = Item.Brief;
export default class MonthlyContainer extends Component {
	state = {
		value: 0,
		orders: [],
		ref: firebase.firestore().collection('orders')
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	onCollectionUpdate = querySnapshot => {
		querySnapshot.forEach(doc => {
			const data = doc.data();
			this.setState({
				orders: data
			});
		});
		console.log(this.state);
	};

	componentDidMount() {
		this.state.ref.onSnapshot(this.onCollectionUpdate);
	}

	render() {
		const { orders } = this.state;
		return (
			<div>
				<div>
					<h2 style={{ color: '#16a085', textAlign: 'center', margin: '15px' }}>
						HISTORY
					</h2>
				</div>
				<div>
					<List className="my-list">
						<Item
							arrow="horizontal"
							thumb={
								<img
									src={orders.foto}
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
							{orders.nama} <Brief>{orders.status}</Brief>
						</Item>
					</List>
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
				<br />
				<br />
				<br />
			</div>
		);
	}
}
