import React, { Component } from 'react';
import './style/home.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import Button from '@material-ui/core/Button';
import CardPicture from '../Card/CardPicture';
import FixedNavbar from '../../../../component/FixedNavbar';

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
		width: '90%',
		maxWidth: '380px',
		minWidth: '300px',
		backgroundColor: '#1ABC9C'
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
		width: '95%',
		fontWeight: 400,
		'&:hover': {
			backgroundColor: '#1ABC9C'
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
		width: '100%',
		maxWidth: '345px',
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
	}
});

class HomeContainer extends Component {
	state = {
		open: false
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<div
				style={{
					backgroundColor: '#e7e7e7',
					minHeight: '100vh',
					overflow: 'hidden'
				}}
			>
				<div>
					<FixedNavbar />
				</div>
				<div style={{ backgroundColor: '#e7e7e7', padding: '5px', marginTop: '55px', }}>
					<div
						style={{
							marginTop: 15,
							padding: '10px',
							textAlign: 'center',
							paddingTop: 0,
							paddingBottom: 0
						}}
					>
						<CardPicture />
					</div>
					<br />
					<div>
						<div style={{ textAlign: 'center' }}>
							<div className="carousel-center">
								<Carousel />
							</div>
						</div>
						<br />
						<div style={{ textAlign: 'center' }}>
							<Button
								variant="extended"
								color="primary"
								className={classes.cssRoot}
								onClick={() => this.props.history.push('/form_login')}
								size="large"
							>
								Pick Trash
							</Button>
						</div>
						<br />
						<br />
					</div>
				</div>
			</div>
		);
	}
}

HomeContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(HomeContainer));
