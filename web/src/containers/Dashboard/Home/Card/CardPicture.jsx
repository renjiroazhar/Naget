import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

export default class CardPicture extends Component {
	render() {
		return (
			<WingBlank size="lg">
				<WhiteSpace size="lg" />
				<Card>
					<Card.Header
						title={<span style={{ color: '#FFFFFF' }}>User</span>}
						style={{ backgroundColor: '#16a085' }}
						extra={<span style={{ color: '#FFFFFF' }}>50</span>}
					/>
					<Card.Body style={{ padding: 0 }}>
						<div style={{ textAlign: 'center', fontSize: '14px' }}>
							Telah menukarkan sampah kepada moretrash dengan jumlah :
							<div style={{ fontSize: '35px' }}>50 KG</div>
						</div>
					</Card.Body>
				</Card>
				<WhiteSpace size="lg" />
			</WingBlank>
		);
	}
}
