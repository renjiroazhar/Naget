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

import TooltipButton from '../../../../components/TooltipButton';

import OrderDetail from '../OrderDetail/OrderDetail';

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

class OrderContainer extends React.Component {
	pushPage() {
		this.props.navigator.pushPage({ component: OrderDetail });
	}

	componentDidMount() {
		this.props.firestore.get('orders');
	}

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
						lineHeight: '56px',
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
		const { orders, classes } = this.props;
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
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						height: '100%',
						position: 'relative',
						top: 'calc(50% - 10px)'
					}}
				>
					<Icon size={35} spin={true} icon="ion-sad" />
					<br />
					Belum Ada Order
				</div>
			);
		} else {
			return (
				<Page
					renderToolbar={this.renderToolbar}
					renderFixed={() => <TooltipButton />}
				>
					<div style={{ margin: '10px' }}>
						{orders &&
							orders.map(order => {
								return (
									<List style={{ width: '100%' }} key={order.id}>
										<ListItem
											button
											onClick={() =>
												this.props.navigator.pushPage({
													component: OrderDetail,
													props: { idItem: order.id }
												})
											}
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
														src={`${order.foto.downloadURLs[0]}`}
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
												primary={order.logs.name}
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
															: order.logs.status === 'WAITING_CONFIRMATION'
																? 'Menunggu Konfirmasi'
																: null}
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
				</Page>
			);
		}
	}
}

OrderContainer.propTypes = {
	classes: PropTypes.object.isRequired
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
