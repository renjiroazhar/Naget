import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from 'firebase';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import CircularProgress from '@material-ui/core/CircularProgress';

class EditOrder extends Component {
	state = {
		foto: [],
		logs: [],
		location: [],

		name: '',
		email: '',
		phone: '',
		address: '',
		catatan: '',

		jam: '',
		tanggal: '',
		loading: false,

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

	async componentDidMount() {
		const idOrder = this.props.match.params.id;
		const ref = firebase
			.firestore()
			.collection('orders')
			.doc(idOrder);

		try {
			const getData = await ref.onSnapshot(doc => {
				var dataSnapshot = doc.data();
				if (
					dataSnapshot !== null ||
					dataSnapshot !== [] ||
					dataSnapshot !== 'undefined'
				) {
					const foto = dataSnapshot.foto ? dataSnapshot.foto : [];
					const logs = dataSnapshot.logs ? dataSnapshot.logs : [];
					const location = dataSnapshot.location ? dataSnapshot.location : [];
					const name = !logs.name ? '' : logs.name;
					const email = !logs.email ? '' : logs.email;
					const phone = !logs.phone ? '' : logs.phone;
					const address = !location.alamat ? '' : location.alamat;
					const catatan = !location.catatan ? '' : location.catatan;
					const loading = !dataSnapshot ? true : false;

					this.setState({
						foto: foto,
						logs: logs,
						location: location,
						name: name,
						email: email,
						phone: phone,
						address: address,
						catatan: catatan,
						loading: loading
					});
				} else {
					console.log('Kosong? , Astaughfirullah');
				}
			});
			return getData;
		} catch (error) {
			console.log(error);
		}
	}
	handleBackPage = () => {
		this.props.history.push(`/orderdetail/${this.props.match.params.id}`);
	};

	render() {
		const { classes } = this.props;
		const { foto, loading } = this.state;

		if (loading) {
			return (
				<div
					style={{
						backgroundColor: '#e7e7e7',
						height: '100%'
					}}
				>
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
		return (
			<div
				style={{
					backgroundColor: '#e7e7e7',
					height: '100%',
					marginBottom: '25%'
				}}
			>
				<div style={{ flex: 1 }}>
					<AppBar
						style={{ width: '100%', backgroundColor: '#00c43e' }}
						position="static"
					>
						<Toolbar>
							<IconButton
								onClick={this.handleBackPage}
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
							>
								<ArrowLeft />
							</IconButton>
							<Typography variant="title" color="inherit" className={classes.grow}>
								Edit Your Order
							</Typography>
						</Toolbar>
					</AppBar>
				</div>

				<div style={{ textAlign: 'center' }}>
					<Grid item xs={12}>
						<TextField
							label="Name"
							fullWidth
							autoComplete="fname"
							value={this.state.name}
							className={classes.textField}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type="email"
							label="Email"
							fullWidth
							autoComplete="fname"
							value={this.state.email}
							className={classes.textField}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="WhatsApp Number"
							fullWidth
							autoComplete="fname"
							className={classes.textField}
							value={this.state.phone}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Address"
							fullWidth
							value={this.state.address}
							autoComplete="billing address-line1"
							className={classes.textField}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Driver Note"
							fullWidth
							autoComplete="billing address-line1"
							className={classes.textField}
							value={this.state.catatan}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Pickup Date"
							fullWidth
							autoComplete="billing address-line1"
							className={classes.textField}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Pickup Time"
							fullWidth
							autoComplete="billing address-line1"
							className={classes.textField}
						/>
					</Grid>
					<List>
						<List className={classes.list2} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Photo :" />
							</ListItem>
							<div>
								{foto !== null || foto !== [] ? (
									foto.map((foto, i) => {
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
										<div style={{ textAlign: 'center' }}>No Photo</div>
									)}
								<br />
								<br />
								<br />
							</div>
						</List>
					</List>
				</div>
			</div>
		);
	}
}

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
	},
	textField: {
		width: '90%',
		marginTop: '15px'
	}
});

EditOrder.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(EditOrder));
