import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import './style/style.css';
import WaitingConfirmation from './OrderList/WaitingConfirmation';
import OrderHistory from './OrderList/OrderHistory';
import FixedNavbar from '../../../../component/FixedNavbar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	},
	indicator: {
		backgroundColor: '#00c43e'
	}
});

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

class OrderContainer extends React.Component {
	state = {
		value: 0,
		orders: []
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	getSafe = (fn, defaultVal) => {
		try {
			return fn();
		} catch (e) {
			return defaultVal;
		}
	};

	componentDidMount() {
		const { orders } = this.props;
		this.getSafe(() => orders, 'nothing');
	}

	render() {
		const { orders, theme, classes } = this.props;

		if (!isLoaded(orders)) {
			return (
				<div
					style={{
						backgroundColor: '#e7e7e7',
						height: '100%'
					}}
				>
					<FixedNavbar pageName="Order" />
					<AppBar style={{ marginTop: '55px' }} color="default">
						<Tabs
							onChange={this.handleChange}
							indicatorColor="primary"
							classes={{
								indicator: classes.indicator
							}}
							textColor="primary"
							variant="fullWidth"
							value={this.state.value}
						>
							<Tab label="Ordered" style={stylus.tab} />
							<Tab label="History" style={stylus.tab} />
						</Tabs>
					</AppBar>
					<div
						style={{
							textAlign: 'center',
							minHeight: '100vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							overflow: 'hidden'
						}}
					>
						<CircularProgress />
					</div>
				</div>
			);
		}
		if (isEmpty(orders)) {
			return (
				<div
					style={{
						backgroundColor: '#e7e7e7',
						height: '100%'
					}}
				>
					<FixedNavbar pageName="Order" />
					<AppBar style={{ marginTop: '55px' }} color="default">
						<Tabs
							onChange={this.handleChange}
							indicatorColor="primary"
							classes={{
								indicator: classes.indicator
							}}
							textColor="primary"
							variant="fullWidth"
							value={this.state.value}
						>
							<Tab label="Ordered" style={stylus.tab} />
							<Tab label="History" style={stylus.tab} />
						</Tabs>
					</AppBar>
					<div
						style={{
							textAlign: 'center',
							minHeight: '100vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							overflow: 'hidden'
						}}
					>
						<br />
						No Order
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div style={{ marginBottom: '20%' }}>
						<AppBar color="default" style={{ position: 'fixed' }}>
							<Toolbar style={{ backgroundColor: '#00c43e' }}>
								<Typography
									variant="title"
									color="inherit"
									style={{
										color: 'white',
										fontWeight: 'bold',
										fontSize: '1.1rem'
									}}
								>
									Order
								</Typography>
							</Toolbar>
							<Tabs
								value={this.state.value}
								onChange={this.handleChange}
								indicatorColor="primary"
								classes={{
									indicator: classes.indicator
								}}
								textColor="primary"
								variant="fullWidth"
							>
								<Tab label="Ordered" style={stylus.tab} />
								<Tab label="History" style={stylus.tab} />
							</Tabs>
						</AppBar>
						<div style={{ width: '100%', marginTop: '100px' }}>
							<SwipeableViews
								axis={theme === 'rtl' ? 'x-reverse' : 'x'}
								index={this.state.value}
								onChangeIndex={this.handleChangeIndex}
							>
								<TabContainer dir="">
									<div>
										<WaitingConfirmation orders={orders} />
									</div>
								</TabContainer>
								<TabContainer>
									<div>
										<OrderHistory orders={orders} />
									</div>
								</TabContainer>
							</SwipeableViews>
						</div>
					</div>
				</div>
			);
		}
	}
}

OrderContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

const stylus = {
	tab: {
		border: 'none',
		borderColor: '#00c43e',
		borderBottomColor: 'white',
		color: 'black',
		fontWeight: 'normal'
	}
};

const mapStateToProps = state => {
	return {
		orders: state.firestore.ordered.orders,
		auth: state.firebase.auth,
		uid: state.firebase.auth.uid
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(props => {
		// console.log(props.uid);
		if (!props.uid) return [];
		return [
			{
				collection: 'orders',
				where: [['userId', '==', props.uid]]
			}
		];
	})
)(withStyles(styles)(OrderContainer));
