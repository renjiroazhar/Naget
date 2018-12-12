import React from 'react';
import HistorySummary from '../HistorySummary';
import { Link } from 'react-router-dom';

const HistoryList = ({ orders }) => {
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
