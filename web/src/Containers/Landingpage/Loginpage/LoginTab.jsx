import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { signIn } from '../../../store/actions/authActions';
import Socmed from './Socmed/Socmed';
import { Redirect } from 'react-router-dom';
import ChatBubble from '@material-ui/icons/Chat';

const styles = theme => ({
	layout: {
		width: 'auto',
		height: '100%',
		backgroundColor: 'black',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
			width: 500,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		display: 'flex',
		flexGrow: 1,
		height: '100%',
		minHeight: '100vh',
		backgroundColor: '#282c34',
		flexDirection: 'column',
		alignItems: 'center',
		border: 0,
		borderColor: '#282c34'
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: 'white',
		width: '50px',
		height: '50px'
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	cssUnderline: {
		width: '100%',
		borderColor: '#fff',
		color: '#fff',
		borderBottomColor: 'white',
		'&:before': {
			borderBottomColor: 'white'
		},
		'&:after': {
			borderBottomColor: 'white'
		},
		'&:hover': {
			borderBottomColor: 'white'
		}
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		backgroundColor: '#00c43e'
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
	iconchat: {
		color: '#fff',
		'&:hover': {
			color: '#00c43e'
		}
	}
});

class LoginTab extends Component {
	state = {
		email: '',
		password: '',
		redirect: false
	};

	loginEmailPassword = e => {
		this.props.signIn(this.state);
	};

	loginGoogle = e => {
		this.props.signInWithGoogle();
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.loginEmailPassword();
		}
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { classes, redirect } = this.props;
		return (
			<div
				style={{ width: '100%', height: '100%', backgroundColor: '#282c34' }}
			>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<img
							src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
							srcSet="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
							width="171"
							height="50"
							alt="Moretrash Logo"
							retina_logo_url=""
							className="moretrash-logo"
						/>
						<p style={{ color: 'white', fontWeight: 400 }}>
							Drop Your Trash and get benefit!
						</p>
						<form className={classes.form}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Email</InputLabel>
								<Input
									id="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									autoComplete="email"
									autoFocus
									classes={{
										underline: classes.cssUnderline
									}}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Kata Sandi</InputLabel>
								<Input
									name="password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={this.state.password}
									onChange={this.handleChange}
									onKeyPress={this.handleChange}
									classes={{
										underline: classes.cssUnderline
									}}
								/>
							</FormControl>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Ingatkan Saya"
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={this.loginEmailPassword}
							>
								Masuk
							</Button>
						</form>
						<Typography />
						<div style={{ marginTop: '50px' }}>
							<Socmed />
						</div>
					</Paper>

					<Button
						variant="fab"
						id="button-daftar"
						color="primary"
						className={classes.absolute}
					>
						<ChatBubble className={classes.iconchat} />
					</Button>
					<div>{redirect ? <Redirect to="/home" /> : ''}</div>
				</main>
			</div>
		);
	}
}

LoginTab.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch, props) => {
	console.log(props);
	return {
		signIn: creds => dispatch(signIn(creds))
	};
};

const mapStateToProps = state => {
	console.log(state);
	return {
		authError: state.auth.authError,
		redirect: state.auth.redirect,
		auth: state.firebase.auth
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(LoginTab));
