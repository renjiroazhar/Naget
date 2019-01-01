import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import './style/style.css';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import '@firebase/firestore';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Navbar from '../../../component/Navbar';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

class Signuppage extends Component {
	state = {
		name: '',
		phone: '',
		address: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		errorSignup: null,
		errorMessage: '',
		showPassword: false
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = () => {
		this.signUp();
	};

	signUp = () => {
		const { name, phone, address, email, password } = this.state;
		const firestore = firebase.firestore();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(resp => {
				return firestore
					.collection('users')
					.doc(resp.user.uid)
					.set({
						name: name,
						phone: phone,
						address: address
					});
			})
			.then(() => {
				this.setState({
					errorSignup: null
				});
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({
					errorSignup: true,
					errorMessage: err.message
				});
			});
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	componentWillUpdate() {
		setTimeout(() => {
			this.setState({ errorMessage: null });
		}, 5000);
	}

	render() {
		const { redirect, classes } = this.props;
		const { password, passwordConfirmation } = this.state;
		const isInvalid = password !== passwordConfirmation;
		return (
			<div style={{ overflow: 'hidden', width: '100%' }}>
				<div>
					<Navbar />
				</div>
				<div style={{ padding: 15 }}>
					<Paper className={classes.paper}>
						<div
							style={{
								height: '100%',
								backgroundColor: '#fff',
								padding: '20px',
								marginTop: '60px'
							}}
						>
							<p
								style={{
									textAlign: 'center',
									color: '#000'
								}}
							>
								Register
							</p>
							<div>
								<FormControl style={{ width: '100%' }}>
									<InputLabel
										htmlFor="custom-css-input"
										FormLabelClasses={{
											root: classes.cssLabel,
											focused: classes.cssFocused
										}}
									>
										Full Name
									</InputLabel>
									<Input
										classes={{
											underline: classes.cssUnderline
										}}
										id="name"
										type="text"
										onChange={this.handleChange}
										value={this.state.name}
									/>
								</FormControl>
							</div>
							<div>
								<FormControl style={{ width: '100%', marginTop: '10px' }}>
									<InputLabel
										htmlFor="custom-css-input"
										FormLabelClasses={{
											root: classes.cssLabel,
											focused: classes.cssFocused
										}}
									>
										Email
									</InputLabel>
									<Input
										classes={{
											underline: classes.cssUnderline
										}}
										id="email"
										type="text"
										onChange={this.handleChange}
										value={this.state.email}
									/>
								</FormControl>
							</div>
							<div>
								<FormControl style={{ width: '100%', marginTop: '10px' }}>
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
										id="address"
										type="text"
										onChange={this.handleChange}
										value={this.state.address}
									/>
								</FormControl>
							</div>
							<div>
								<FormControl style={{ width: '100%', marginTop: '10px' }}>
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
										id="phone"
										type="text"
										onChange={this.handleChange}
										value={this.state.phone}
									/>
								</FormControl>
							</div>
							<div>
								<FormControl style={{ width: '100%', marginTop: '10px' }}>
									<InputLabel
										htmlFor="custom-css-input"
										FormLabelClasses={{
											root: classes.cssLabel,
											focused: classes.cssFocused
										}}
									>
										Password
									</InputLabel>
									<Input
										classes={{
											underline: classes.cssUnderline
										}}
										id="password"
										type="password"
										onChange={this.handleChange}
										value={this.state.password}
									/>
								</FormControl>
							</div>
							<div className="group">
								<FormControl style={{ width: '100%', marginTop: '10px' }}>
									<InputLabel
										htmlFor="custom-css-input"
										FormLabelClasses={{
											root: classes.cssLabel,
											focused: classes.cssFocused
										}}
									>
										Confirm Password
									</InputLabel>
									<Input
										classes={{
											underline: classes.cssUnderline
										}}
										id="passwordConfirmation"
										type="password"
										onChange={this.handleChange}
										value={this.state.passwordConfirmation}
									/>
								</FormControl>
							</div>
							<Button
								type="button"
								className={classes.cssRoot}
								onClick={e => {
									this.setState({
										errorSignup: null,
										errorMessage: null
									});
									e.preventDefault();
									this.handleSubmit();
								}}
							>
								{' '}
								<span>Register</span>
								<div className="ripples buttonRipples">
									<span className="ripplesCircle" />
								</div>
							</Button>
							<br />
							<div>
								{isInvalid ? (
									<p
										style={{
											textAlign: 'center',
											color: 'red'
										}}
									>
										Password and Confirm Password must same
									</p>
								) : null}
							</div>
							<div>
								{this.state.errorSignup ? (
									<p
										style={{
											textAlign: 'center',
											color: 'red'
										}}
									>
										{this.state.errorMessage}
									</p>
								) : null}
							</div>
							<div>
								<p
									style={{
										textAlign: 'center',
										color: 'black',
										marginTop: '30px'
									}}
								>
									Already have account?{' '}
									<Link
										to="/login"
										style={{ color: '#00c43e', textDecoration: 'none' }}
									>
										Login
									</Link>
								</p>
							</div>
						</div>
						{redirect ? <Redirect to="/" /> : null}
					</Paper>
				</div>
			</div>
		);
	}
}

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	dense: {
		marginTop: 19
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
		padding: 0,
		width: '100%',
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 3
		}
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
		maxWidth: '380px',
		width: '90%',
		borderRadius: 0,
		fontWeight: 400,
		color: 'white',
		backgroundColor: '#00c43e',
		textDecoration: 'none'
	},
	marginForm: {
		maxWidth: '350px',
		width: '100%',
		fontWeight: 400,
		color: 'white',
		textDecoration: 'none'
	},
	cssRoot: {
		color: '#FFFFFF',
		backgroundColor: '#00c43e',
		width: '100%',
		height: '',
		fontWeight: 400,
		'&:hover': {
			backgroundColor: '#00c43e'
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
	},
	cssLabel: {
		color: '#999',
		'&$cssFocused': {
			color: '#000000'
		}
	},
	cssFocused: {},
	cssUnderline: {
		width: '100%',
		borderColor: '#fff',
		color: '#000',
		borderBottomColor: '#000000',
		'&:before': {
			borderBottomColor: '#000000'
		},
		'&:after': {
			borderBottomColor: '#000000'
		},
		'&:hover': {
			borderBottomColor: '#000000'
		}
	}
});

Signuppage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Signuppage));