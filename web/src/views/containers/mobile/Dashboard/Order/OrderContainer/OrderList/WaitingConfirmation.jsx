import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../OrderSummary';
const WaitingConfirmation = ({ orders }) => {
	return (
		<div>
			{orders &&
				orders.map(order => {
					const { status, id } = order;
					if (status === 'WAITING_CONFIRMATION') {
						return (
							<div key={id}>
								<Link to={`/orderdetail/${id}`}>
									<OrderSummary order={order} key={id} />
								</Link>
							</div>
						);
					}
					return <div key={id} />;
				})}
		</div>
	);
};
export default WaitingConfirmation;
