import React, { Component } from 'react';
import './style/home.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardPicture from '../Card/CardPicture';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { editProfile } from '../../../../redux/actions/profileActions';
import firebase from '../../../../services/firebaseConfig';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Logo from '../../../../assets/img/moretrash.jpg';
import Promo from '../../../../assets/img/png/promo.png';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import tTrashScale from '../../../../assets/img/png/tTrashScale.png';
import tTrashBag from '../../../../assets/img/png/tTrashBag.png';
import tTrashPoints from '../../../../assets/img/png/tTrashPoints.png';
import tTrashDrop from '../../../../assets/img/png/tTrashDrop.png';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	appBar: {
		position: 'fixed',
		backgroundColor: '#00c43e'
	},
	flex: {
		flex: 1
	},

	form: {
		textAlign: 'center'
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	},
	absolute: {
		color: '#00c43e',
		backgroundColor: '#00c43e',
		position: 'fixed',
		right: '0px',
		bottom: '0px',
		marginBottom: '40px',
		marginRight: '24px'
	},
	margin: {
		width: '90%',
		maxWidth: '380px',
		minWidth: '300px',
		backgroundColor: '#00c43e'
	},
	marginForm: {
		maxWidth: '350px',
		width: '100%',
		fontWeight: 400,
		color: 'white',
		textDecoration: 'none'
	},
	cssRoot: {
		backgroundColor: '#fffff',
		width: '55px',
		height: '55px',
		fontWeight: 400,
		margin: '0 2% 2.5% 2%',
		padding: '3px',
		border: '1px solid #c7c7c7	',
		'&:hover': {
			backgroundColor: '#ffffff'
		}
	},
	cssLabel: {
		color: '#999',
		'&$cssFocused': {
			color: '#999'
		}
	},
	cssFocused: {},
	cssUnderline: {
		width: '100%',
		maxWidth: '345px',
		borderColor: '#fff',
		color: '#black',
		borderBottomColor: 'black',
		'&:before': {
			borderBottomColor: 'black'
		},
		'&:after': {
			borderBottomColor: 'black'
		}
	},
	iconchat: {
		color: '#fff',
		'&:hover': {
			color: '#00c43e'
		}
	},
	bootstrapRoot: {
		boxShadow: 'none',
		textTransform: 'none',
		maxWidth: '350px',
		width: '100%',
		fontSize: 16,
		fontWeight: 400,
		padding: '6px 12px',
		border: '1px solid',
		backgroundColor: '#007bff',
		borderColor: '#007bff',
		color: 'white',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#0062cc',
			borderColor: '#005cbf'
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
		}
	},
	image: {
		margin: '20px'
	},
	snackbar: {
		position: 'absolute',
		bottom: theme.spacing.unit * 5,
		right: theme.spacing.unit * 5
	},
	snackbarContent: {
		width: 360
	},
	bootstrapInput: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
		}
	},
	bootstrapFormLabel: {
		fontSize: 18
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class HomeContainer extends Component {
	state = {
		open: false,
		name: '',
		address: '',
		phone: '',
		screenWidth: window.innerWidth
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	editProfile = () => {
		const { auth } = this.props;
		this.props.editProfile(this.state, auth.uid);
	};

	handleSave = () => {
		this.editProfile();
		this.handleClose();
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleResize = () => {
		this.setState({
			screenWidth: window.innerWidth
		});
	};

	async getData() {
		const { auth } = this.props;
		const ref = firebase
			.firestore()
			.collection('users')
			.doc(auth.uid);
		try {
			const getData = await ref.onSnapshot(doc => {
				var dataSnapshot = doc.data();
				console.log('Data Loaded');
				if (dataSnapshot && dataSnapshot !== undefined) {
					this.setState({
						name: dataSnapshot && dataSnapshot.name,
						address: dataSnapshot && dataSnapshot.address,
						phone: dataSnapshot && dataSnapshot.phone
					});
				} else {
					console.log('Kosong? , Astaughfirullah');
					this.handleClickOpen();
				}
			});
			return getData;
		} catch (error) {
			console.log(error);
		}
	}

	handleForm = () => {
		this.props.history.push('/form_login');
	};

	componentDidMount() {
		this.getData();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const { classes } = this.props;
		const { name, screenWidth } = this.state;
		const gridPicture = () => {
			if (screenWidth > 350) {
				return (
					<div style={{ textAlign: 'center', marginTop: '1%' }}>
						<div style={{ textAlign: 'center', width: '	100%' }}>
							<Grid
								container
								alignItems="center"
								align="center"
								alignContent="center"
								spacing={24}
								style={{ padding: 10 }}
							>
								<Grid item xs={3}>
									<Button
										className={classes.cssRoot}
										onClick={this.handleForm}
										size="small"
										aria-label=""
									>
										<img
											src={tTrashScale}
											height="48px"
											width="48px"
											alt=""
											title=""
										/>
									</Button>
								</Grid>
								<Grid item xs={3}>
									<Button
										className={classes.cssRoot}
										onClick={this.handleForm}
										size="small"
										aria-label=""
									>
										<img
											src={tTrashBag}
											height="48px"
											width="48px"
											alt=""
											title=""
										/>
									</Button>
								</Grid>{' '}
								<Grid item xs={3}>
									<Button
										className={classes.cssRoot}
										onClick={this.handleForm}
										size="small"
										aria-label=""
									>
										<img
											src={tTrashPoints}
											height="48px"
											width="48px"
											alt=""
											title=""
										/>
									</Button>
								</Grid>
								<Grid item xs={3}>
									<Button
										className={classes.cssRoot}
										onClick={this.handleForm}
										size="small"
										aria-label=""
									>
										<img
											src={tTrashDrop}
											height="48px"
											width="48px"
											alt=""
											title=""
										/>
									</Button>
								</Grid>
							</Grid>
						</div>
					</div>
				);
			} else {
				return (
					<div style={{ textAlign: 'center', marginTop: '1%' }}>
						<div style={{ textAlign: 'center', width: '	100%' }}>
							<Button
								className={classes.cssRoot}
								onClick={this.handleForm}
								size="small"
								aria-label=""
							>
								<img
									src={tTrashScale}
									height="48px"
									width="48px"
									alt="Trash Scale"
									title="Trash Scale"
								/>
							</Button>

							<Button
								className={classes.cssRoot}
								onClick={this.handleForm}
								size="small"
								aria-label=""
							>
								<img
									src={tTrashBag}
									height="48px"
									width="48px"
									alt="Trash Scale"
									title="Trash Scale"
								/>
							</Button>
							<Button className={classes.cssRoot}  size="small">
								<img
									src={tTrashPoints}
									height="48px"
									width="48px"
									alt="Trash Points"
									title="Trash Points"
								/>
							</Button>
							<Button className={classes.cssRoot}  size="small">
								<img
									src={tTrashDrop}
									height="48px"
									width="48px"
									alt="Trash Drop"
									title="Trash Drop"
								/>
							</Button>
						</div>
					</div>
				);
			}
		};
		return (
			<div
				style={{
					backgroundColor: '#fff',
					height: '100%',
					overflow: 'hidden'
				}}
			>
				<div style={{ textAlign: 'center' }}>
					<img
						src={Logo}
						srcSet={Logo}
						width="141"
						height="40"
						alt="Moretrash Logo"
						retina_logo_url=""
						className={classes.image}
					/>
				</div>
				<div
					style={{
						backgroundColor: '#ffffff',
						padding: '5px'
					}}
				>
					<div
						style={{
							padding: '10px',
							textAlign: 'center',
							paddingTop: 0,
							paddingBottom: 0
						}}
					>
						<CardPicture name={name} />
					</div>
					<br />
					{gridPicture()}
					<div style={{ padding: '7px', textAlign: 'center', marginTop: '2%' }}>
						<img
							src={Promo}
							height="100%"
							width="100%"
							alt="Promo"
							title="Promo"
						/>
					</div>
				</div>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<Typography variant="h6" color="inherit" className={classes.flex}>
								Profile
							</Typography>
							<Button color="inherit" onClick={this.handleSave}>
								Save
							</Button>
						</Toolbar>
					</AppBar>
					<div style={{ textAlign: 'center', marginTop: '75px' }}>
						<div>
							<h5 style={{ fontSize: '16px', margin: 0 }}>
								Looks like , you are the new user of us
							</h5>
							<p
								style={{
									padding: 0,
									margin: 0
								}}
							>
								Please Complete your Profile
							</p>
						</div>

						<FormControl style={{ width: '90%' }}>
							<InputLabel
								htmlFor="custom-css-input"
								FormLabelClasses={{
									root: classes.cssLabel,
									focused: classes.cssFocused
								}}
							>
								Name
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="name"
								type="text"
								onChange={this.handleChange}
								value={this.state.name}
							/>
						</FormControl>
						<br />
						<br />
						<FormControl style={{ width: '90%' }}>
							<InputLabel
								htmlFor="custom-css-input"
								FormLabelClasses={{
									root: classes.cssLabel,
									focused: classes.cssFocused
								}}
							>
								Phone Number
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="phone"
								type="text"
								onChange={this.handleChange}
								value={this.state.phone}
							/>
						</FormControl>
						<br />
						<br />
						<FormControl style={{ width: '90%' }}>
							<InputLabel
								htmlFor="custom-css-input"
								FormLabelClasses={{
									root: classes.cssLabel,
									focused: classes.cssFocused
								}}
							>
								Address
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="address"
								type="text"
								onChange={this.handleChange}
								value={this.state.address}
							/>
						</FormControl>
					</div>
				</Dialog>
				<br />
				<br />
				<br />
			</div>
		);
	}
}

HomeContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	const id = state.firebase.auth.uid;
	const users = state.firestore.data.users;
	const user = users ? users[id] : null;
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		userdata: user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		editProfile: (userdata, id) => dispatch(editProfile(userdata, id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withRouter(HomeContainer)));
