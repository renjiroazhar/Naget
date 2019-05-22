import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../OrderSummary';
const OrderOnProcess = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					const { status, id } = order;
					if (status === 'Success') {
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
export default OrderOnProcess;
