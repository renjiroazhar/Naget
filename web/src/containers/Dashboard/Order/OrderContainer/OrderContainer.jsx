import React from 'react';
import { Toolbar, Page, Icon } from 'react-onsenui';
import { connect } from 'react-redux';
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import GarbageIcon from './image/garbage.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import './style/style.css';

import OrderDetail from '../OrderDetail/OrderDetail';
import TooltipButton from '../../../../components/TooltipButton';
import ons from 'onsenui';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
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
		value: 0
	};
	pushPage() {
		this.props.navigator.pushPage({ component: OrderDetail });
		this.props.changeTabbarVisibility();
	}

	componentDidMount() {
		this.props.firestore.get('orders');
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	renderToolbar() {
		return (
			<Toolbar
				transparent
				noshadow
				style={{ height: '56px', backgroundColor: '#333c4e' }}
			>
				{/* <div className="left">
						<BackButton>Back</BackButton>
					</div> */}
				<div
					className="center"
					style={{
						lineHeight: '76px',
						display: 'block',
						textAlign: 'center',
						marign: 'auto'
					}}
				>
					<img
						src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
						srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
						width="120px"
						height="35px"
						alt="Moretrash Logo"
						retina_logo_url=""
						class="fusion-standard-logo"
					/>
				</div>
				{/* <div className="right">
						<ToolbarButton>
							<Icon icon="md-menu" />
						</ToolbarButton>
					</div> */}
			</Toolbar>
		);
	}

	render() {
		const { orders, classes, theme, changeVisibilityFalse } = this.props;

		const tabBar = () => {
			if (ons.platform.isIOS()) {
				return (
					<AppBar position="static" color="default">
						<Tabs
							style={{ marginTop: '10px' }}
							value={this.state.value}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							fullWidth
						>
							<Tab label="Ordered" style={stylus.tab} />
							<Tab label="Booked" style={stylus.tab} />
						</Tabs>
					</AppBar>
				);
			} else {
				return (
					<AppBar position="static" color="default">
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							fullWidth
						>
							<Tab label="Ordered" style={stylus.tab} />
							<Tab label="Booked" style={stylus.tab} />
						</Tabs>
					</AppBar>
				);
			}
		};

		if (!isLoaded(orders)) {
			return (
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						height: '100%',
						position: 'relative',
						top: 'calc(50% - 10px)'
					}}
				>
					<Icon size={35} spin={true} icon="ion-load-d" />
					<br />
					Loading
				</div>
			);
		}
		if (isEmpty(orders)) {
			return (
				<Page
					renderToolbar={this.renderToolbar}
					renderFixed={() => <TooltipButton />}
					style={{ overflow: 'hidden' }}
				>
					<div
						style={{
							textAlign: 'center',
							justifyContent: 'center',

							position: 'relative',
							top: 'calc(50% - 20px)',
							overflow: 'hidden'
						}}
					>
						<Icon size={35} icon="ion-sad" />
						<br />
						Belum Ada Order
					</div>
				</Page>
			);
		} else {
			return (
				<Page
					renderToolbar={this.renderToolbar}
					renderFixed={() => <TooltipButton />}
				>
					<div style={{ width: '100%' }}>
						{tabBar()}
						<SwipeableViews
							axis={theme === 'rtl' ? 'x-reverse' : 'x'}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
						>
							<TabContainer>
								<div>
									{orders &&
										orders.map(order => {
											return (
												console.log(order.logs.name),
												(
													<List style={{ width: '100%' }} key={order.id}>
														<ListItem
															button
															onClick={() => {
																changeVisibilityFalse();
																this.props.navigator.pushPage({
																	component: OrderDetail,
																	props: {
																		idItem: order.id,
																		changeVisibilityTrue: () =>
																			this.props.changeVisibilityTrue()
																	}
																});
															}}
															alignItems="flex-start"
														>
															<ListItemAvatar>
																{order.foto ? (
																	<Avatar
																		style={{
																			borderRadius: '5%',
																			width: '45px',
																			height: '45px'
																		}}
																		alt="Remy Sharp"
																		src={`${
																			order.foto[0] ? order.foto[0] : ''
																		}`}
																	/>
																) : (
																	<Avatar
																		style={{
																			borderRadius: '5%',
																			width: '45px',
																			height: '45px'
																		}}
																		alt="Remy Sharp"
																		src={<GarbageIcon />}
																	/>
																)}
															</ListItemAvatar>
															<ListItemText
																primary={order.logs.name ? order.logs.name : ''}
																secondary={
																	<React.Fragment>
																		<Typography
																			component="span"
																			className={classes.inline}
																			color="textPrimary"
																		>
																			Telah menukarkan sampah sebanyak ...
																		</Typography>
																		<br />

																		{order.logs.status
																			? order.logs.status === 'SUCCESS'
																				? 'Berhasil'
																				: order.logs.status ===
																				  'WAITING_CONFIRMATION'
																					? 'Menunggu Konfirmasi'
																					: ''
																			: ''}
																	</React.Fragment>
																}
															/>
															<ListItemSecondaryAction>
																<IconButton
																	onClick={() =>
																		this.props.navigator.pushPage({
																			component: OrderDetail,
																			props: { idItem: order.id }
																		})
																	}
																	aria-label="Comments"
																>
																	<InfoIcon />
																</IconButton>
															</ListItemSecondaryAction>
														</ListItem>
													</List>
												)
											);
										})}
								</div>
							</TabContainer>
							<TabContainer>
								<div>
									{orders &&
										orders.map(order => {
											return (
												<List style={{ width: '100%' }} key={order.id}>
													<ListItem
														button
														onClick={() => {
															changeVisibilityFalse();
															this.props.navigator.pushPage({
																component: OrderDetail,
																props: {
																	idItem: order.id,
																	changeVisibilityTrue: () =>
																		this.props.changeVisibilityTrue()
																}
															});
														}}
														alignItems="flex-start"
													>
														<ListItemAvatar>
															{order.foto.downloadURLs ? (
																<Avatar
																	style={{
																		borderRadius: '5%',
																		width: '45px',
																		height: '45px'
																	}}
																	alt="Remy Sharp"
																	src={`${
																		order.foto.downloadURLs[0].url
																			? order.foto.downloadURLs[0].url
																			: ''
																	}`}
																/>
															) : (
																<Avatar
																	style={{
																		borderRadius: '5%',
																		width: '45px',
																		height: '45px'
																	}}
																	alt="Remy Sharp"
																	src={<GarbageIcon />}
																/>
															)}
														</ListItemAvatar>
														<ListItemText
															primary={order.logs.name ? order.logs.name : ''}
															secondary={
																<React.Fragment>
																	<Typography
																		component="span"
																		className={classes.inline}
																		color="textPrimary"
																	>
																		Telah menukarkan sampah sebanyak ...
																	</Typography>
																	<br />

																	{order.logs.status === 'SUCCESS'
																		? 'Berhasil'
																		: order.logs.status ===
																		  'WAITING_CONFIRMATION'
																			? 'Menunggu Konfirmasi'
																			: ''}
																</React.Fragment>
															}
														/>
														<ListItemSecondaryAction>
															<IconButton
																onClick={() =>
																	this.props.navigator.pushPage({
																		component: OrderDetail,
																		props: { idItem: order.id }
																	})
																}
																aria-label="Comments"
															>
																<InfoIcon />
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
												</List>
											);
										})}
								</div>
							</TabContainer>
						</SwipeableViews>
					</div>
				</Page>
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
		borderColor: 'white',
		borderBottomColor: 'white'
	}
};

const mapStateToProps = state => {
	return {
		orders: state.firestore.ordered.orders
	};
};

export default compose(
	withFirestore,
	connect(mapStateToProps)
)(withStyles(styles)(OrderContainer));
