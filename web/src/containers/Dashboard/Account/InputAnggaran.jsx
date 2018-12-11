import React, { Component } from 'react';
import { NavBar, Card, List, Button } from 'antd-mobile';
import Cancel from './svg/cancel.svg';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

class InputAnggaran extends Component {
	state = {
		totalAnggaran: 0
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(this.state);
	};

	render() {
		return (
			<div>
				<NavBar
					mode="light"
					icon={
						<Link to={`/account/`}>
							<img
								src={Cancel}
								height="20px"
								width="20px"
								alt="Currency free icon"
								title="Currency free icon"
								// selected={this.props.selectedTab === "account"}
								// onClick={() => { this.props.onChangeTab('account') }}
							/>
						</Link>
					}
					onClick={() => this.props.history.push('/account')}
					style={{ backgroundColor: '#872ef5', padding: '25px 0px 25px 0px' }}
				>
					<p style={{ color: '#fff', marginTop: '17px' }}>INPUT ANGGARAN</p>
				</NavBar>

				<div style={{ margin: '15px' }}>
					<Card
						style={{
							background: '#fff',
							padding: '35px',
							borderRadius: '0px',
							border: '3px (#000)'
						}}
					>
						<List>
							<TextField
								id="standard-name"
								label="Input Anggaran"
								name="totalAnggaran"
								type="number"
								value={this.state.totalAnggaran}
								width="100%"
								style={{ width: '100%' }}
								onChange={this.handleChange}
								margin="normal"
							/>
						</List>
					</Card>
				</div>

				<div style={{ textAlign: 'center' }}>
					<Button
						iinline
						style={{
							borderRadius: '50px',
							backgroundColor: '#00ae69',
							color: '#fff',
							width: '90%'
						}}
					>
						SUBMIT
					</Button>
				</div>
			</div>
		);
	}
}

export default withRouter(InputAnggaran);
