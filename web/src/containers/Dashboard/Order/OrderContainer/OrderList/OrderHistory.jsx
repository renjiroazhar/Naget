import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../OrderSummary';
const OrderHistory = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					if (order.status !== 'WAITING_CONFIRMATION') {
						return (
							<div key={order.id}>
								<Link to={`/orderdetail/${order.id}`}>
									<OrderSummary order={order} key={order.id} />
								</Link>
							</div>
						);
					}
					return <div />;
				})}
		</div>
	);
};
export default OrderHistory;
