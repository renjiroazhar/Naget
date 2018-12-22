import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import 'moment/locale/id';

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
		visible: false,
		downloadURLs: []
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

	deleteOrder = () => {
		const idItem = this.props.match.params.id;
		this.props.removeOrder(idItem);
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
	getSafe = (fn, defaultVal) => {
		try {
			return fn();
		} catch (e) {
			return defaultVal;
		}
	};

	componentDidMount() {
		const { order } = this.props;
		this.getSafe(() => order, 'nothing');
		this.getSafe(() => order.photos, 'nothing');
		this.getSafe(() => order.user.name, 'nothing');
		this.getSafe(() => order.location.alamat, 'nothing');
		this.getSafe(() => order.user.phone, 'nothing');
		this.getSafe(() => order.location.catatan, 'nothing');
	}

	render() {
		const { order, classes } = this.props;

		if (order) {
			return (
				<div style={{ backgroundColor: '#e7e7e7' }}>
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
							backgroundColor: '#ffffff',
							width: '100%',
							padding: '10px',
							marginLeft: '-3px'
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
										primary={!order.user.name ? '' : order.user.name}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Alamat" />
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={
											!order.location.alamat ? '' : order.location.alamat
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
										primary={!order.user.phone ? '' : order.user.phone}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText
										style={{ float: 'left' }}
										secondary="Waktu Penjemputan"
									/>
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={
											!order.orderDate
												? ''
												: moment(order.orderDate.toDate()).format('LLLL')
										}
									/>
								</ListItem>
							</List>

							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Catatan" />
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
									<ListItemText style={{ float: 'left' }} secondary="Foto :" />
								</ListItem>
								<div>
									{order.photos !== null ||
									order.photos !== [] ||
									order.photos !== 'undefined' ? (
										order.photos &&
										order.photos.map((foto, i) => {
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
																style={{ display: 'block', margin: '20px', 
																objectFit: 'contain' }}
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
										<div style={{ textAlign: 'center' }}>
											<p>Tidak Ada Foto</p>
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
		removeOrder: id => dispatch(removeOrder(id))
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(props => {
		// console.log(props.uid);
		if (!props.uid) return [];
		console.log(props.uid);
		return [
			{
				collection: 'orders',
				where: [['userId', '==', props.uid]]
			}
		];
	})
)(withStyles(styles)(withRouter(OrderDetail)));
