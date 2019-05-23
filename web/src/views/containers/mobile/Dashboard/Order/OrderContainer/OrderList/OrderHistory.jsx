import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../OrderSummary';
const OrderHistory = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					const { status, id } = order;
					if (status !== 'On Process') {
						return (
							<div key={id}>
								<Link to={`/orderdetail/${id}`}>
									<OrderSummary order={order} key={id} />
								</Link>
							</div>
						);
					}
					return "";
				})}
		</div>
	);
};
export default OrderHistory;
