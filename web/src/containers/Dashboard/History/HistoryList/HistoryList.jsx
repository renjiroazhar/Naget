import React from 'react';
import HistorySummary from '../HistorySummary';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Spin } from 'antd';

const HistoryList = ({ orders }) => {
	if (!isLoaded(orders)) {
		return (
			<div style={{ textAlign: 'center', marginTop: '45%' }}>
				<Spin tip="Loading..." />
			</div>
		);
	}
	if (isEmpty(orders)) {
		return <p style={{ textAlign: 'center' }}>Belum Ada Order :(</p>;
	}

	return (
		<div>
			{orders &&
				orders.map(order => {
					return (
						<Link to={'/history/' + order.id}>
							<HistorySummary order={order} key={order.id} />
						</Link>
					);
				})}
		</div>
	);
};

export default HistoryList;
