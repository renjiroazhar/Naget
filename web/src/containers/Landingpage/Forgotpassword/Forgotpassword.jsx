import React, { Component } from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import { resetPassword } from '../../../redux/actions/profileActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Navbar from '../../../component/Navbar';

class Forgotpassword extends Component {
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

		this.resetPassword();
	};

	resetPassword = () => {
		const { email } = this.state;
		var credential = {
			email
		};

		this.props.resetPassword(credential);
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	render() {
		const { resetErr, classes } = this.props;

		return (
			<div>
				<div>
					<Navbar />
				</div>
				<div
					style={{
						height: '100%',
						backgroundColor: '#fff',
						padding: '40px',
						marginTop: '40px'
					}}
				>
					<h1
						style={{
							textAlign: 'center',
							color: '#000',
							marginBottom: '20px'
						}}
					>
						Reset Password
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
					<center>
						<Button
							type="button"
							className={classes.cssRoot}
							onClick={this.handleSubmit}
						>
							{' '}
							<span> Reset Password </span>
							<div className="ripples buttonRipples">
								<span className="ripplesCircle" />
							</div>
						</Button>{' '}
					</center>
					<div>
						{resetErr ? (
							<p
								style={{
									textAlign: 'center',
									color: 'red'
								}}
							>
								{resetErr}
							</p>
						) : null}
					</div>
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
		maxWidth: '380px',
		width: '90%',
		borderRadius: 0,
		fontWeight: 400,
		color: 'white',
		backgroundColor: '#1ABC9C',
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
		backgroundColor: '#1ABC9C',
		width: '100%',
		fontWeight: 400,
		marginTop: '40px',
		'&:hover': {
			backgroundColor: '#1ABC9C'
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
	return {
		resetErr: state.userprofile.resetErr
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetPassword: emailAddress => dispatch(resetPassword(emailAddress))
	};
};

Forgotpassword.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Forgotpassword));
