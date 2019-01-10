import React from 'react';
import { connect } from 'react-redux';
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
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import 'moment/locale/id';

import { cancelOrder } from '../../../../../redux/actions/orderActions';

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
		visible: false,
		createdAt: '',
		photos: [],
		location: [],
		logs: [],
		orderDate: '',
		status: '',
		user: [],
		userId: '',
		loading: false
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

	cancelOrder = () => {
		const {
			createdAt,
			photos,
			location,
			logs,
			orderDate,
			status,
			user,
			userId
		} = this.state;
		let dataItem = {
			createdAt,
			photos,
			location,
			logs,
			orderDate,
			status,
			user,
			userId
		};
		const idItem = this.props.match.params.id;
		this.props.cancelOrder(dataItem, idItem);
		this.props.history.push('/order');
	};

	deleteArrayImage = index => {
		const { downloadURLs } = this.state;
		downloadURLs.slice(index, 1);
		this.set({
			downloadURLs
		});
	};
	deleteUploadedImage = url => {
		// Create a reference to the file to delete
		var desertRef = firebase.storage().refFromURL(url);

		// Delete the file
		desertRef
			.delete()
			.then(function(res) {
				console.log(res, 'Waw Sukses');
				this.deleteArrayImage();
			})
			.catch(function(error) {
				console.log(error, 'Wadidaw Error');
			});
	};

	backPage = () => {
		this.props.history.push('/order');
	};

	async componentDidMount() {
		const idItem = this.props.match.params.id;
		const ref = firebase
			.firestore()
			.collection('orders')
			.doc(idItem);
		try {
			const getData = await ref.onSnapshot(doc => {
				var dataSnapshot = doc.data();
				if (dataSnapshot !== null || dataSnapshot !== []) {
					console.log('Data Terload  ');
					this.setState({
						createdAt: dataSnapshot.createdAt,
						photos: dataSnapshot.photos,
						location: dataSnapshot.location,
						logs: dataSnapshot.logs,
						orderDate: dataSnapshot.orderDate,
						status: dataSnapshot.status,
						user: dataSnapshot.user,
						userId: dataSnapshot.userId,
						loading: false
					});
					console.log('Data Terload');
				} else {
					console.log('Kosong? , Astaughfirullah');
					this.setState({
						loading: true
					});
				}
			});
			return getData && (window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true);
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const { classes } = this.props;
		const { loading, location, orderDate, photos, user } = this.state;

		if (!loading) {
			return (
				<div style={{ backgroundColor: '#e7e7e7' }}>
					<div style={{ flex: 1 }}>
						<AppBar
							style={{ width: '100%', backgroundColor: '#00c43e' }}
							position="static"
						>
							<Toolbar style={{paddingLeft: 0}}>
								<IconButton
									onClick={this.backPage}
									className={classes.menuButton}
									color="inherit"
									aria-label="Menu"
								>
									<ArrowLeft />
								</IconButton>
								<Typography
									variant="title"
									color="inherit"
									style={{ fontSize: '20px' }}
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
							backgroundColor: '#ffffff',
							width: '100%',
							padding: '10px',
							marginLeft: '-3px'
						}}
					>
						<List style={{ overflow: 'hidden' }}>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Name" />
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={!user.name ? '' : user.name}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Address" />
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={!location.alamat ? '' : location.alamat}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText
										style={{ float: 'left' }}
										secondary="Phone Number"
									/>
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={!user.phone ? '' : user.phone}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText
										style={{ float: 'left' }}
										secondary="Pickup Time"
									/>
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={
											!orderDate
												? ''
												: moment(orderDate.toDate()).format('LLLL')
										}
									/>
								</ListItem>
							</List>

							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText
										style={{ float: 'left' }}
										secondary="Driver Note"
									/>
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={location.catatan ? location.catatan : ''}
									/>
								</ListItem>
							</List>
							<List className={classes.list2} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Photo :" />
								</ListItem>
								<div>
									{photos !== null ||
									photos !== [] ||
									photos !== 'undefined' ? (
										photos &&
										photos.map((foto, i) => {
											return (
												<div key={i}>
													<Grid container spacing={24}>
														<Grid item xs={12} align="center">
															<img
																onClick={this.viewImage}
																src={foto}
																alt="preview failed"
																key={i}
																width="250"
																height="250"
																style={{
																	display: 'block',
																	margin: '20px',
																	objectFit: 'contain'
																}}
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
														key={i}
													/>
												</div>
											);
										})
									) : (
										<div style={{ textAlign: 'center' }}>
											<p>No Photo</p>
										</div>
									)}
									<br />
									<br />
									<br />
								</div>
							</List>
						</List>

						<div
							style={{
								textAlign: 'center',
								bottom: 0,
								height: '46px',
								backgroundColor: 'white',
								width: '100%'
							}}
						>
							<Button
								varian="contained"
								style={{
									backgroundColor: '#f43c3c',
									width: '90%',
									textAlign: 'center',
									color: '#ffffff'
								}}
								onClick={this.cancelOrder}
							>
								Cancel Order
							</Button>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div
					style={{
						backgroundColor: '#e7e7e7',
						height: '100%'
					}}
				>
					<div style={{ flex: 1 }}>
						<AppBar
							style={{ width: '100%', backgroundColor: '#00c43e' }}
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
									variant="title"
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
	}
}

OrderDetail.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const orders = state.firestore.data.orders;
	const order = orders ? orders[id] : null;
	return {
		order: order,
		uid: state.firebase.auth.uid
	};
};

const mapDispatchToProps = dispatch => {
	return {
		cancelOrder: (dataItem, id) => dispatch(cancelOrder(dataItem, id))
	};
};

const composingOrderDetail = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withRouter(OrderDetail)));

export { composingOrderDetail as OrderDetail };
