import React, { Component } from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/authActions';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '../../../components/Tooltip';

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
							<FormControl style={{ width: '100%' }}>
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
							<FormControl style={{ width: '100%' }}>
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
						<br />
						<button
							type="button"
							className="buttonui"
							onClick={this.handleSubmit}
						>
							{' '}
							<span> Masuk </span>
							<div className="ripples buttonRipples">
								<span className="ripplesCircle" />
							</div>
						</button>{' '}
						<br />
						<div>
							{authError ? (
								<p
									style={{
										textAlign: 'center',
										color: 'red',
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
								Belum punya akun? <Link to="/signup">Registrasi sekarang!</Link>
							</p>
						</div>
					</form>

					<div className="powered">
						Powered by{' '}
						<a href="http://https://www.moretrash.id/"> Moretrash </a>
					</div>
				</div>
				<Tooltip />
				{redirect ? <Redirect to="/" /> : null}
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
