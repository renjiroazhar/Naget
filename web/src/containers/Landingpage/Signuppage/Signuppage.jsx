import React, { Component } from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import { signUp } from '../../../redux/actions/authActions';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
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
	},
	margin: {
		margin: theme.spacing.unit,
		width: '100%',
		fontWeight: 400,
		color: 'white',
		backgroundColor: '#00c43e',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#00c43e'
		}
	},
	form: {
		textAlign: 'center'
	}
});

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
		const { password, passwordConfirmation } = this.state;

		if (password !== passwordConfirmation) {
			this.setState({
				errorSignup: true,
				errorMessage: 'Password dan Password Konfirmasi harus sama'
			});
		}

		this.signUp();
	};

	signUp = () => {
		const { name, phone, address, email, password } = this.state;
		var credential = {
			name,
			phone,
			address,
			email,
			password
		};

		this.props.signUp(credential);
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	render() {
		const { signupError, redirect, classes } = this.props;
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
					<form
						onSubmit={e => {
							this.setState({
								errorSignup: null
							});
							e.preventDefault();
							this.handleSubmit();
						}}
					>
						<div className="group">
							<FormControl style={{ width: '90%' }}>
								<InputLabel
									htmlFor="custom-css-input"
									FormLabelClasses={{
										root: classes.cssLabel,
										focused: classes.cssFocused
									}}
								>
									Nama Lengkap
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
						<div className="group">
							<FormControl style={{ width: '90%' }}>
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
							<FormControl style={{ width: '90%' }}>
								<InputLabel
									htmlFor="custom-css-input"
									FormLabelClasses={{
										root: classes.cssLabel,
										focused: classes.cssFocused
									}}
								>
									Nomor Telepon
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
						<div className="group">
							<FormControl style={{ width: '90%' }}>
								<InputLabel
									htmlFor="custom-css-input"
									FormLabelClasses={{
										root: classes.cssLabel,
										focused: classes.cssFocused
									}}
								>
									Alamat
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
						<div className="group">
							<FormControl style={{ width: '90%' }}>
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
							<FormControl style={{ width: '90%' }}>
								<InputLabel
									htmlFor="custom-css-input"
									FormLabelClasses={{
										root: classes.cssLabel,
										focused: classes.cssFocused
									}}
								>
									Konfirmasi Kata Sandi
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
						<br />
						<button
							type="button"
							className="buttonui"
							onClick={e => {
								this.setState({
									errorSignup: null
								});
								e.preventDefault();
								this.handleSubmit();
							}}
						>
							{' '}
							<span>Daftar </span>
							<div className="ripples buttonRipples">
								<span className="ripplesCircle" />
							</div>
						</button>
						<br />
						<div>
							{signupError ? (
								this.state.errorSignup ? (
									<p
										style={{
											textAlign: 'center',
											color: 'red',
											marginTop: '10px'
										}}
									>
										{this.state.errorMessage}
									</p>
								) : (
									<p
										style={{
											textAlign: 'center',
											color: 'red',
											marginTop: '10px'
										}}
									>
										{signupError}
									</p>
								)
							) : null}
						</div>
						<br />
						<div>
							<p style={{ textAlign: 'center', color: 'black' }}>
								Sudah punya akun? <Link to="/">Masuk</Link>
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
		signupError: state.auth.signupError,
		redirect: state.auth.redirect
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signUp: creds => dispatch(signUp(creds))
	};
};

Signuppage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Signuppage));
