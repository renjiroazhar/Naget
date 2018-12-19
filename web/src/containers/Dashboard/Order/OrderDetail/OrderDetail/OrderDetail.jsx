import React from 'react';
import { Page, Icon } from 'react-onsenui';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import EditOrder from '../../EditOrder';
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
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import { removeOrder } from '../../../../../redux/actions/orderActions';

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
		open: true,
		visible: false
	};

	viewImage = () => {
		this.setState({
			visible: true
		});
	};
	cancelViewImage = () => {
		this.setState({
			visible: false
		});
	};

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	pushPage() {
		this.props.navigator.pushPage({ component: EditOrder });
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

	backPage = () => {
		this.props.popPage();
		this.props.changeVisibilityTrue();
	};

	componentDidMount() {
		console.log(this.props);
	}

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
										onClick={this.backPage}
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
								width: '100%',
								marginBottom: '20%'
							}}
						>
							<Button
								style={{
									backgroundColor: '#f43c3c',
									width: '90%',
									textAlign: 'center',
									color: '#ffffff'
								}}
								onClick={this.props.pushPage}
							>
								Edit
							</Button>

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
											order.foto.map((foto, i) => {
												return (
													<div>
														<Grid container spacing={24}>
															<Grid item xs={12} align="center">
																<img
																	onClick={this.viewImage}
																	src={foto}
																	alt="preview failed"
																	key={i}
																	width="250"
																	height="250"
																	style={{ display: 'block', margin: '20px' }}
																/>
															</Grid>
														</Grid>

														<Viewer
															visible={this.state.visible}
															onClose={this.cancelViewImage}
															images={[
																{
																	src: foto,
																	alt: ''
																}
															]}
														/>
													</div>
												);
											})
										) : (
											<div style={{ textAlign: 'center' }}>Tidak Ada Foto</div>
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
