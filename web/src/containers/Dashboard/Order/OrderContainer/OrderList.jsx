import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
const OrderList = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					return (
						<div key={order.id}>
							<Link to={`/orderdetail/${order.id}`}>
								<OrderSummary order={order} key={order.id} />
							</Link>
						</div>
					);
				})}
		</div>
	);
};
export default OrderList;
