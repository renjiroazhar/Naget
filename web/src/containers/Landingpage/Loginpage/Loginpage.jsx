import React, { Component } from 'react';
import './style/dummy.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {
	signIn,
	signInWithFacebook,
	signInWithGoogle
} from '../../../redux/actions/authActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';

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
	textField: {
		color: '#ffffff'
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
		color: '#FFFFFF',
		backgroundColor: '#00c43e',
		maxWidth: '380px',
		width: '90%',
		height: '',
		fontWeight: 400,
		'&:hover': {
			backgroundColor: '#00c43e'
		}
	},
	cssFoot: {
		color: '#ffffff',
		maxWidth: '380px',
		width: '90%',
		height: '',
		fontWeight: 400,
		margin: '5px',
		'&:hover': {
			backgroundColor: '#f7f7f7'
		}
	},
	cssLabel: {
		color: '#999',
		'&$cssFocused': {
			color: 'white'
		}
	},
	cssFocused: {},
	cssUnderline: {
		width: '90%',
		maxWidth: '380px',
		minWidth: '300px',
		borderColor: '#fff',
		color: '#fff',
		borderBottomColor: 'white',
		'&:before': {
			borderBottomColor: 'white'
		},
		'&:after': {
			borderBottomColor: 'white'
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
	}
});
class Loginpage extends Component {
	state = {
		email: '',
		password: ''
	};

	signIn = () => {
		const { email, password } = this.state;
		var creds = {
			email,
			password
		};
		this.props.signIn(creds);
	};

	signInWithFacebook = () => {
		this.props.signInWithFacebook();
	};

	signInWithGoogle = () => {
		this.props.signInWithGoogle();
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { classes, redirect, authError } = this.props;

		return (
			<div className="home">
				<div className="container">
					<img
						src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
						srcSet="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
						width="171"
						height="50"
						alt="Moretrash Logo"
						retina_logo_url=""
						className="moretrash-logo"
					/>

					<div style={{ textAlign: 'center' }}>
						<p style={{ color: 'white', fontWeight: 400 }}>
							Drop Your Trash and get benefit!
						</p>
						<div style={{ textAlign: 'center', color: 'white' }}>
							<FormControl className="margin-form">
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
									onKeyPress={this.handleKeyPress}
									id="email"
									value={this.state.email}
									name="email"
									type="email"
									onChange={this.handleChange}
								/>
							</FormControl>
							<br />
							<br />
							<FormControl className="margin-form">
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
									onKeyPress={this.handleKeyPress}
									id="password"
									name="password"
									value={this.state.password}
									type="password"
									onChange={this.handleChange}
								/>
							</FormControl>

							<br />
							<br />
							{authError ? (
								<p
									style={{
										textAlign: 'center',
										color: 'white',
										fontFamily: 'unset',
										fontSize: '13px',
										margin: 0,
										padding: 0
									}}
								>
									{authError}
								</p>
							) : null}
							<br />
							<Button
								variant="extended"
								color="primary"
								className={classes.cssRoot}
								onClick={this.signIn}
								size="large"
							>
								MASUK
							</Button>
							<div style={{ textAlign: 'center' }}>
								<p
									style={{
										textAlign: 'center',
										color: 'white',
										marginTop: '5%',
										padding: 0,
										fontFamily: 'arial',
										fontWeight: 'initial'
									}}
								>
									ATAU
								</p>
							</div>

							<div style={{ width: '100%', marginTop: '5%' }}>
								<Button
									id="forgetBtn"
									onClick={this.signInWithGoogle}
									className={classes.cssFoot}
									style={{ backgroundColor: 'red' }}
								>
									LOGIN DENGAN GOOGLE
								</Button>

								<br />
								<Button
									id="forgetBtn"
									onClick={this.signInWithFacebook}
									className={classes.cssFoot}
									style={{ backgroundColor: 'blue' }}
								>
									LOGIN DENGAN FACEBOOK
								</Button>
							</div>
							<br />
							<div
								style={{
									bottom: 20,
									position: 'fixed',
									textAlign: 'center',
									width: '100%'
								}}
							>
								<p
									id="forgetBtn"
									style={{
										float: 'left',
										margin: '5%',
										color: 'white',
										fontFamily: 'arial',
										fontWeight: 'initial'
									}}
									onClick={this.forgotPassword}
								>
									REGISTER
								</p>

								<p
									id="forgetBtn"
									style={{
										float: 'right',
										margin: '5%',
										color: 'white',
										fontFamily: 'arial',
										fontWeight: 'initial'
									}}
									onClick={this.forgotPassword}
								>
									FORGOT PASSWORD?
								</p>
							</div>
						</div>
					</div>
				</div>
				{redirect ? <Redirect to="/" /> : null}
			</div>
		);
	}
}

Loginpage.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: creds => dispatch(signIn(creds)),
		signInWithFacebook: () => dispatch(signInWithFacebook()),
		signInWithGoogle: () => dispatch(signInWithGoogle())
	};
};

const mapStateToProps = state => {
	console.log(state);
	return {
		authError: state.auth.authError,
		redirect: state.auth.redirect
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withRouter(Loginpage)));
