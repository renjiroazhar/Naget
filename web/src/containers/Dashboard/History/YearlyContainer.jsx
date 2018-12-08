import React, { Component } from 'react';
import { Card } from 'antd-mobile';

export default class YearlyContainer extends Component {
	state = {
		openKeys: ['sub1'],
		data: [],
		dataTahun: [],
		history: '',
		totalEstimasiSemua: 0,
		totalEstimasiPerbulan: [],
		namaBulan: '',
		namaTahun: 0,
		tahun: '',
		loading: false
	};
	render() {
		return (
			<div>
				<Card style={{ margin: '15px', backgroundColor: '#f0555a' }}>
					<Card.Body>
						<div
							style={{
								textAlign: 'center',
								color: 'white',
								fontSize: '15px'
							}}
						>
							Total Spending
						</div>
						<div
							style={{
								fontWeight: 'bold',
								textAlign: 'center',
								color: 'white',
								fontSize: '25px'
							}}
						/>
						<div>
							<p
								style={{
									textAlign: 'center',
									color: 'white',
									marginTop: '10px'
								}}
							>
								History
							</p>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
