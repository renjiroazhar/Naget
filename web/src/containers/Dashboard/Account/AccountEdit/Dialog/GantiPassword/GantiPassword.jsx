import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { changePassword } from '../../../../../../redux/actions/profileActions';

import { LockOutline } from '@ant-design/icons';
import AntdIcon from '@ant-design/icons-react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Lock from '@material-ui/icons/Lock';

AntdIcon.add(LockOutline);

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#333c4e'
	},
	flex: {
		flex: 1
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
	},
	margin: {
		margin: theme.spacing.unit,
		maxWidth: '350px',
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

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class GantiPassword extends React.Component {
	state = {
		open: false,
		currentPassword: '',
		newPassword: '',
		passwordConfirmation: ''
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

	changePassword = () => {
		this.props.changePassword(
			this.state.currentPassword,
			this.state.newPassword
		);
	};

	// reauthenticate = currentPassword => {
	// 	var user = firebase.auth().currentUser;
	// 	var cred = firebase.auth.EmailAuthProvider.credential(
	// 		user.email,
	// 		currentPassword
	// 	);
	// 	return user.reauthenticateWithCredential(cred);
	// };

	// onChangePassword = () => {
	// 	this.reauthenticate(this.state.currentPassword)
	// 		.then(() => {
	// 			var user = firebase.auth().currentUser;
	// 			user
	// 				.updatePassword(this.state.password)
	// 				.then(() => {
	// 					console.log('Password was changed');
	// 				})
	// 				.catch(err => {
	// 					console.log(err);
	// 				});
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };

	handleSave = () => {
		const { userprofile } = this.props;
		this.changePassword();
		if (!userprofile.changePassErr) {
			console.log('Error');
		} else {
			this.handleClose();
		}
	};

	render() {
		const { classes, userprofile } = this.props;
		const { newPassword, passwordConfirmation } = this.state;
		const isInvalid = newPassword !== passwordConfirmation;
		return (
			<div style={{ backgroundColor: 'white' }}>
				<List
					onClick={this.handleClickOpen}
					className={classes.list}
					style={{ paddingBottom: '10px' }}
				>
					<ListItem button onClick={this.handleClickOpen}>
						<ListItemIcon>
							<Lock style={{ fontSize: '24px', color: 'orange' }} />
						</ListItemIcon>
						<ListItemSecondaryAction>
							<ListItemText
								style={{ fontSize: '24px' }}
								inset
								primary="Ubah Kata Sandi"
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close"
							>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" className={classes.flex}>
								Ganti Kata Sandi
							</Typography>
							<Button color="inherit" onClick={this.handleSave}>
								Simpan
							</Button>
						</Toolbar>
					</AppBar>
					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						<FormControl style={{ width: '90%' }}>
							<InputLabel
								htmlFor="custom-css-input"
								FormLabelClasses={{
									root: classes.cssLabel,
									focused: classes.cssFocused
								}}
							>
								Kata sandi saat ini
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								type="password"
								id="currentPassword"
								onChange={this.handleChange}
								value={this.state.currentPassword}
							/>
						</FormControl>

						<br />
						<br />
						<div>
							<h5 style={{ fontSize: '16px', margin: 0 }}>
								Mohon isi kata sandi Anda di bawah ini
							</h5>
							<p
								style={{
									color: '#9e9e9e',
									padding: 0,
									margin: 0
								}}
							>
								Minimal 6 karakter terdiri dari huruf dan angka
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
								Kata sandi baru
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="newPassword"
								type="password"
								onChange={this.handleChange}
								value={this.state.newPassword}
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
								Konfirmasi Kata sandi baru
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="passwordConfirmation"
								type="password"
								onChange={this.handleChange}
								value={this.state.passwordConfirmation}
							/>
						</FormControl>
						<div>
							{isInvalid ? (
								<p
									style={{
										textAlign: 'center',
										color: 'red',
										marginTop: '10px'
									}}
								>
									Kata Sandi yang Anda masukkan tidak sama
								</p>
							) : null}
						</div>
						{userprofile.changePassErr ? (
							userprofile.changePassErrMessage ? (
								<p style={{ color: 'red', textAlign: 'center' }}>
									{userprofile.changePassErrMessage}
								</p>
							) : null
						) : null}
					</div>
				</Dialog>
			</div>
		);
	}
}

GantiPassword.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	const id = state.firebase.auth.uid;
	const users = state.firestore.data.users;
	const user = users ? users[id] : null;
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		userdata: user,
		userprofile: state.userprofile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changePassword: (currentPassword, newPassword) =>
			dispatch(changePassword(currentPassword, newPassword))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(GantiPassword));
