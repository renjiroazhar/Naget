import React from 'react';
import HistorySummary from './HistorySummary';

const HistoryList = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					return <HistorySummary order={order} key={order.id} />;
				})}
		</div>
	);
};

export default HistoryList;
