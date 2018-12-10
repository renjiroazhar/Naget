import React, { Component } from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/authActions';
import { Redirect, Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing.unit
	},
	withoutLabel: {
		marginTop: theme.spacing.unit * 3
	},
	textField: {
		flexBasis: 200
	}
});

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

	render() {
		const { authError, redirect, classes } = this.props;
		return (
			<div>
				<div className="background" />
				<div className="background2" />
				<div className="loginForm">
					<hgroup>
						<h1>
							<img
								src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
								alt="logo"
							/>
						</h1>
					</hgroup>
					<form onSubmit={this.handleSubmit}>
						<div className="group">
							<FormControl
								className={classNames(classes.margin, classes.textField)}
							>
								<InputLabel htmlFor="adornment-password">Email</InputLabel>
								<Input
									fullWidth
									id="email"
									value={this.state.email}
									onChange={this.handleChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton aria-label="Toggle password visibility" />
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<div className="group">
							<FormControl
								className={classNames(classes.margin, classes.textField)}
							>
								<InputLabel htmlFor="adornment-password">Password</InputLabel>
								<Input
									fullWidth
									id="password"
									type={this.state.showPassword ? 'text' : 'password'}
									value={this.state.password}
									onChange={this.handleChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="Toggle password visibility"
												onClick={this.handleClickShowPassword}
											>
												{this.state.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<button
							type="button"
							className="buttonui"
							onClick={this.handleSubmit}
						>
							{' '}
							<span> Login </span>
							<div className="ripples buttonRipples">
								<span className="ripplesCircle" />
							</div>
						</button>
						<br />
						<div>
							{authError ? (
								<p
									style={{
										textAlign: 'center',
										color: '#000000',
										marginTop: '10px'
									}}
								>
									{authError}
								</p>
							) : null}
						</div>
						<br />
						<div>
							<p style={{ textAlign: 'center', color: 'black' }}>
								<Link to="/forgot_password">Lupa Password?</Link>
							</p>
						</div>
						<br />
						<div>
							<p style={{ textAlign: 'center', color: 'black' }}>
								Belum punya akun? <a href="">Registrasi sekarang!</a>
							</p>
						</div>
					</form>

					<div className="powered">
						Powered by{' '}
						<a href="http://https://www.moretrash.id/"> Moretrash </a>
					</div>
				</div>

				{redirect ? <Redirect to="/home" /> : null}
			</div>
		);
	}
}

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
