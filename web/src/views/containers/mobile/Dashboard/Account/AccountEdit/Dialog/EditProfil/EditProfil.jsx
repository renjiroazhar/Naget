import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const styles = theme => ({
	appBar: {
		position: 'fixed',
		backgroundColor: '#fecb00ff'
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
		backgroundColor: '#fecb00ff',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#fecb00ff'
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
		username: '',
		email: '',
		address: '',
		phone: '',
		loading: true,
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
		let userId = localStorage.getItem('userId');
		const { email, username, phone, address } = this.state;
		axios.patch(`https://mysqlnaget.herokuapp.com/api/Users/${userId}`, {
			username,
			email,
			phone,
			address
		})
		this.handleClose();
	};

	getData() {
		let userId = localStorage.getItem('userId');
		axios.get(`https://mysqlnaget.herokuapp.com/api/Users/${userId}`)
			.then(res => {
				if (res.data) {
					this.setState({
						email: res.data.email,
						username: res.data.username,
						address: res.data.address,
						phone: res.data.phone,
						dataUser: res.data,
						loading: false
					});
				} else {
					this.setState({ open: true })

				}
			})
	}


	componentDidMount() {
		this.getData();
		window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={{ backgroundColor: 'white' }}>
				<List
					className={classes.list}
					onClick={this.handleClickOpen}
				>
					{this.state.loading ? (<ListItem style={{ justifyContent: "center" }}>    <CircularProgress /></ListItem>) : (
						<ListItem button onClick={this.handleClickOpen}>
							<ListItemText
								style={{ float: 'left' }}
								primary={this.state.username ? this.state.username : null}
								secondary={
									<div>
										<p>{this.state.email ? this.state.email : null}</p>
										<p>{this.state.address ? this.state.address : null}</p>
										<p>{this.state.phone ? this.state.phone : null}</p>
									</div>}
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

					)}
				</List>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar style={{ paddingLeft: 0 }}>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close"
							>
								<CloseIcon />
							</IconButton>
							<Typography
								variant="title"
								color="inherit"
								className={classes.flex}
							>
								Profile
							</Typography>
							<Button
								varian="contained"
								color="inherit"
								onClick={this.handleSave}
							>
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
								id="username"
								type="text"
								onChange={this.handleChange}
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
								Email
							</InputLabel>
							<Input
								classes={{
									underline: classes.cssUnderline
								}}
								onKeyPress={this.handleKeyPress}
								id="email"
								type="text"
								onChange={this.handleChange}
							/>
						</FormControl>
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
							/>
						</FormControl>
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
							/>
						</FormControl>
						<br />
						<br />
					</div>
				</Dialog>
			</div>
		);
	}
}

EditProfil.propTypes = {
	classes: PropTypes.object.isRequired
};

export default (withStyles(styles)(EditProfil));
