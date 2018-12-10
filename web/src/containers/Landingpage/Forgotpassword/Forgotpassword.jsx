import React, { Component } from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import { resetPassword } from '../../../redux/actions/profileActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
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

class Forgotpassword extends Component {
	state = {
		email: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
		console.log(this.state);
	};

	handleSubmit = e => {
		e.preventDefault();
		this.resetPassword();
	};

	resetPassword = () => {
		this.props.resetPassword(this.state.email);
	};

	render() {
		const { resetErr, classes } = this.props;
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
						<button
							type="button"
							className="buttonui"
							onClick={this.handleSubmit}
						>
							{' '}
							<span> Reset Password </span>
							<div className="ripples buttonRipples">
								<span className="ripplesCircle" />
							</div>
						</button>
						<br />
						<div>
							{resetErr ? (
								<p
									style={{
										textAlign: 'center',
										color: '#000000',
										marginTop: '10px'
									}}
								>
									{resetErr}
								</p>
							) : null}
						</div>

						<br />
					</form>

					<div className="powered">
						Powered by{' '}
						<a href="http://https://www.moretrash.id/"> Moretrash </a>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
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
