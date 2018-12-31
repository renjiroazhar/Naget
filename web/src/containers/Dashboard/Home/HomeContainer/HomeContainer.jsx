import React, { Component } from 'react';
import './style/home.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Carousel from './Carousel';
import CardPicture from '../Card/CardPicture';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { editProfile } from '../../../../redux/actions/profileActions';
import firebase from '../../../../services/firebaseConfig';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Logo from '../../../../assets/moretrash.jpg';
import Promo from '../../../../assets/png/promo.png';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import tTrashScale from '../../../../assets/png/tTrashScale.png';
import tTrashBag from '../../../../assets/png/tTrashBag.png';
import tTrashPoints from '../../../../assets/png/tTrashPoints.png';
import tTrashDrop from '../../../../assets/png/tTrashDrop.png';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	appBar: {
		position: 'fixed',
		backgroundColor: '#333c4e'
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
		color: '#1ABC9C',
		backgroundColor: '#1ABC9C',
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
		backgroundColor: '#1ABC9C'
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
			color: '#1ABC9C'
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
		margin: '20px',
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
		phone: ''
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

	async componentDidMount() {
		const { auth } = this.props;
		const ref = firebase
			.firestore()
			.collection('users')
			.doc(auth.uid);
		try {
			const getData = await ref.onSnapshot(doc => {
				var dataSnapshot = doc.data();
				console.log('Data Loaded');
				if (dataSnapshot != null || dataSnapshot != undefined) {
					this.setState({
						name:
							dataSnapshot.name != null || dataSnapshot.name != undefined
								? dataSnapshot.name
								: '',
						address:
							dataSnapshot.address != null || dataSnapshot.address != undefined
								? dataSnapshot.address
								: '',
						phone:
							dataSnapshot.phone != null || dataSnapshot.phone != undefined
								? dataSnapshot.phone
								: ''
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

	render() {
		const { classes } = this.props;
		const { name } = this.state
		return (
			<div
				style={{
					backgroundColor: '#fff',
					minHeight: '100vh',
					overflow: 'hidden'
				}}
			>
				<div style={{ textAlign: 'center' }} >
					<img
						src={Logo}
						srcSet={Logo}
						width="171"
						height="50"
						alt="Moretrash Logo"
						retina_logo_url=""
						className={classes.image}
					/>
				</div>
				<div
					style={{
						backgroundColor: '#ffffff',
						padding: '5px',
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
					<div style={{ textAlign: 'center', marginTop: '1%', }}>
						<div style={{ textAlign: 'center', width: '	100%', }} >
							<Button
								variant="extended"
								className={classes.cssRoot}
								onClick={() => this.props.history.push('/form_login')}
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
								variant="extended"
								className={classes.cssRoot}
								onClick=""
								size="small"
							>
								<img
									src={tTrashBag}
									height="48px"
									width="48px"
									alt="Trash Bag"
									title="Trash Bag"
								/>
							</Button>
							<Button
								variant="extended"
								className={classes.cssRoot}
								onClick=""
								size="small"
							>
								<img
									src={tTrashPoints}
									height="48px"
									width="48px"
									alt="Trash Points"
									title="Trash Points"
								/>
							</Button>
							<Button
								variant="extended"
								className={classes.cssRoot}
								onClick=""
								size="small"
							>
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
					<div style={{ padding: '7px', textAlign: 'center', marginTop: '2%', }}>
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
