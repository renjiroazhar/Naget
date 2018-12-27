import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import firebase from '../../../../../../services/firebaseConfig';
import { editProfile } from '../../../../../../redux/actions/profileActions';
const styles = theme => ({
	appBar: {
		position: 'fixed',
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

class EditProfil extends React.Component {
	state = {
		open: false,
		name: '',
		address: '',
		phone: ''
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

	editProfile = () => {
		const { auth } = this.props;
		this.props.editProfile(this.state, auth.uid);
	};

	handleSave = () => {
		this.editProfile();
		this.handleClose();
	};

	async componentDidMount() {
		const { auth } = this.props;
		const ref = firebase
			.firestore()
			.collection('users')
			.doc(auth.uid);
		try {
			const getData = await ref.onSnapshot(doc => {
				var dataSnapshot = doc.data();
				if (dataSnapshot !== null || dataSnapshot !== []) {
					this.setState({
						name: dataSnapshot.name && dataSnapshot.name,
						address: dataSnapshot.address && dataSnapshot.address,
						phone: dataSnapshot.phone && dataSnapshot.phone
					});
				} else {
					console.log('Kosong? , Astaughfirullah');
				}
			});
			return getData;
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { classes, profile, auth } = this.props;
		return (
			<div style={{ backgroundColor: 'white' }}>
				<List
					className={classes.list}
					onClick={this.handleClickOpen}
					style={{ paddingBottom: '15px' }}
				>
					<ListItem button onClick={this.handleClickOpen}>
						<ListItemText
							style={{ float: 'left' }}
							primary={
								profile.name
									? profile.name
									: auth.displayName
										? auth.displayName
										: 'No Name'
							}
							secondary={auth.email}
						/>
						<ListItemSecondaryAction>
							<p
								style={{
									margin: '20px',
									cursor: 'pointer',
									fontWeight: 'bold',
									color: '#1f1f21'
								}}
								className={classes.editText}
								onClick={this.handleClickOpen}
							>
								Edit
							</p>
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
								Profile
							</Typography>
							<Button color="inherit" onClick={this.handleSave}>
								Save
							</Button>
						</Toolbar>
					</AppBar>
					<div style={{ textAlign: 'center', marginTop: '75px' }}>
						<FormControl style={{ width: '90%' }}>
							<InputLabel
								htmlFor="custom-css-input"
								FormLabelClasses={{
									root: classes.cssLabel,
									focused: classes.cssFocused
								}}
							>
								Name
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="name"
								type="text"
								onChange={this.handleChange}
								value={this.state.name}
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
								Phone Number
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="phone"
								type="text"
								onChange={this.handleChange}
								value={this.state.phone}
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
								Address
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="address"
								type="text"
								onChange={this.handleChange}
								value={this.state.address}
							/>
						</FormControl>
					</div>
				</Dialog>
			</div>
		);
	}
}

EditProfil.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	const id = state.firebase.auth.uid;
	const users = state.firestore.data.users;
	const user = users ? users[id] : null;
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		userdata: user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		editProfile: (userdata, id) => dispatch(editProfile(userdata, id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(EditProfil));
