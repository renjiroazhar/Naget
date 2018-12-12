import React from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const HistorySummary = ({ order }) => {
	return (
		<div>
			<List className="my-list" key={order}>
				<Item
					arrow="horizontal"
					thumb={
						order.foto ? (
							<img
								src={`${order.foto.downloadURLs[0]}`}
								alt=""
								style={{
									width: '50px',
									height: '50px'
								}}
								width="50px"
								height="50px"
							/>
						) : (
							<img
								src=""
								alt=""
								style={{
									width: '50px',
									height: '50px'
								}}
								width="50px"
								height="50px"
							/>
						)
					}
					multipleLine
					onClick={() => {}}
				>
					{order.logs.name} <Brief>{order.logs.status}</Brief>
				</Item>
			</List>
		</div>
	);
};

export default HistorySummary;
