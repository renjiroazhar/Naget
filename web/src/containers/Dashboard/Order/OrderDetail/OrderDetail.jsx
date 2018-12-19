import React from 'react';
import { Page, Icon } from 'react-onsenui';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import OrderContainer from '../OrderContainer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import { removeOrder } from '../../../../redux/actions/orderActions';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	list: {
		padding: 0
	},
	list2: {
		padding: 6
	}
});

class OrderDetail extends React.Component {
	state = {
		open: true
	};

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	pushPage() {
		this.props.navigator.pushPage({ component: OrderContainer });
	}

	popPage = () => {
		this.props.navigator.popPage();
	};

	changeVisibilityTrue = () => {
		this.props.changeVisibilityTrue();
	};

	deleteOrder = () => {
		const { idItem } = this.props;
		this.props.removeOrder(idItem);
		this.popPage();
		this.props.changeVisibilityTrue();
	};

	render() {
		const { order, classes } = this.props;

		if (order) {
			return (
				console.log(order),
				(
					<Page>
						<div style={{ flex: 1 }}>
							<AppBar
								style={{ width: '100%', backgroundColor: '#333c4e' }}
								position="static"
							>
								<Toolbar>
									<IconButton
										onClick={() => {
											this.popPage();
											this.props.changeVisibilityTrue();
										}}
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<ArrowLeft />
									</IconButton>
									<Typography
										variant="h6"
										color="inherit"
										className={classes.grow}
									>
										Detail
									</Typography>
								</Toolbar>
							</AppBar>
						</div>
						<div
							style={{
								height: '100%',
								minHeight: '100vh',
								backgroundColor: '#ffffff',
								width: '100%'
							}}
						>
							<List style={{ overflow: 'hidden' }}>
								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Nama Pengorder"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={order.logs.name ? order.logs.name : ''}
										/>
									</ListItem>
								</List>
								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Alamat"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={
												order.location.alamat ? order.location.alamat : ''
											}
										/>
									</ListItem>
								</List>
								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Nomor Telepon"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={order.logs.phone ? order.logs.phone : ''}
										/>
									</ListItem>
								</List>

								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Catatan"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={
												order.location.catatan ? order.location.catatan : ''
											}
										/>
									</ListItem>
								</List>
								<List className={classes.list2} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Foto :"
										/>
									</ListItem>
									<div>
										{order.foto ? (
											order.foto.map(foto => {
												return (
													<Grid container spacing={16}>
														<Grid item xs={12}>
															<Grid
																container
																className={classes.demo}
																justify="center"
																spacing={8}
															>
																<Grid item>
																	<img
																		key={foto}
																		src={foto}
																		width="100px"
																		height="100px"
																		alt=""
																	/>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
												);
											})
										) : (
											<div>a</div>
										)}
									</div>
								</List>
							</List>
							<div
								style={{
									textAlign: 'center',
									bottom: 10,
									position: 'fixed',
									width: '100%'
								}}
							>
								<Button
									style={{
										backgroundColor: '#f43c3c',
										width: '90%',
										textAlign: 'center',
										color: '#ffffff'
									}}
									onClick={this.deleteOrder}
								>
									Batalkan Pemesanan
								</Button>
							</div>
						</div>
					</Page>
				)
			);
		} else {
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
	}
}

OrderDetail.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.idItem;
	const orders = state.firestore.data.orders;
	const order = orders ? orders[id] : null;
	return {
		order: order
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeOrder: id => dispatch(removeOrder(id))
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect([{ collection: 'orders' }])
)(withStyles(styles)(OrderDetail));
