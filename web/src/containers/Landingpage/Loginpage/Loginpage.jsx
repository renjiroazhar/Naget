import React, { Component } from 'react';
import { Toolbar, Page } from 'react-onsenui';
import './style/style.css';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/authActions';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Loginpage extends Component {
	state = {
		email: '',
		password: '',
		showPassword: false
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.login();
	};

	login = () => {
		const { email, password } = this.state;
		var credential = {
			email,
			password
		};

		this.props.signIn(credential);
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	renderToolbar() {
		return (
			<Toolbar
				transparent
				noshadow
				style={{ height: '56px', backgroundColor: '#333c4e' }}
			>
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
			</Toolbar>
		);
	}

	render() {
		const { authError, redirect, classes } = this.props;
		const uiConfig = {
			// Popup signin flow rather than redirect flow.
			signInFlow: 'popup',
			// We will display Google and Facebook as auth providers.
			signInOptions: [
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.FacebookAuthProvider.PROVIDER_ID
			],
			callbacks: {
				signInSuccessWithAuthResult: () => {
					this.props.history.push('/');
				}
			}
		};
		return (
			<Page renderToolbar={this.renderToolbar}>
				<div
					style={{ height: '100%', backgroundColor: '#fff', padding: '40px' }}
				>
					<h1
						style={{
							textAlign: 'center',
							color: '#000',
							marginTop: 0,
							marginBottom: '20px'
						}}
					>
						Login
					</h1>
					<div>
						<FormControl style={{ width: '100%' }} onSubmit={this.handleSubmit}>
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
								type="email"
								onChange={this.handleChange}
								value={this.state.email}
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
					<center>
						<Button
							type="button"
							className={classes.cssRoot}
							onClick={this.handleSubmit}
						>
							{' '}
							<span> Masuk </span>
							<div className="ripples buttonRipples">
								<span className="ripplesCircle" />
							</div>
						</Button>{' '}
					</center>
					<div>
						{authError ? (
							<p
								style={{
									textAlign: 'center',
									color: 'red',
									margin: '-15px'
								}}
							>
								{authError}
							</p>
						) : null}
					</div>
					<p style={{ textAlign: 'center' }}>atau</p>
					<div style={{ width: '100%' }}>
						<StyledFirebaseAuth
							uiConfig={uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</div>
					<div>
						<p
							style={{ textAlign: 'center', color: 'black', marginTop: '20px' }}
						>
							<Link to="/forgot_password">Lupa Password?</Link>
						</p>
					</div>
					<div>
						<p style={{ textAlign: 'center', color: 'black', padding: 0 }}>
							Belum punya akun? <Link to="/signup">Daftar sekarang!</Link>
						</p>
					</div>
				</div>
				{redirect ? <Redirect to="/" /> : null}
			</Page>
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
		fontWeight: 400,
		marginBottom: '25px',
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

const mapStateToProps = state => {
	console.log(state);
	return {
		authError: state.auth.authError,
		redirect: state.auth.redirect
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: creds => dispatch(signIn(creds))
	};
};

Loginpage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Loginpage));
