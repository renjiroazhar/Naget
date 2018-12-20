import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
const OrderList = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					return (
						console.log(order),
						(
							<div>
								<Link to={`/orderdetail/${order.id}`}>
									<OrderSummary order={order} />
								</Link>
							</div>
						)
					);
				})}
		</div>
	);
};
export default OrderList;
