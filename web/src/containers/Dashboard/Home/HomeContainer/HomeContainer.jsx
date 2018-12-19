import React from 'react';
import { Toolbar, Page } from 'react-onsenui';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import './style/style.css';
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles';
import CardPicture from '../Card/CardPicture';
import UserForm from '../../Step/UserForm';
import './style/style.css';
import Grid from '@material-ui/core/Grid';
// import TooltipButton from '../../../../components/TooltipButton';
class HomeContainer extends React.Component {
	pushPage() {
		this.props.navigator.pushPage({ component: UserForm });
	}

	renderToolbar() {
		return (
			<Toolbar
				transparent
				noshadow
				style={{ height: '56px', backgroundColor: '#333c4e' }}
			>
				<div
					className="center"
					style={{
						lineHeight: '76px',
						display: 'block',
						textAlign: 'center',
						marign: 'auto'
					}}
				>
					<img
						src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
						srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
						width="120px"
						height="35px"
						alt="Moretrash Logo"
						retina_logo_url=""
						class="fusion-standard-logo"
					/>
				</div>
			</Toolbar>
		);
	}

	render() {
		const { classes, changeVisibilityFalse } = this.props;

		return (
			<Page renderToolbar={this.renderToolbar}>
				<div style={{ height: '100%' }}>
					<br />
					<div>
						<Grid container alignItems="center" justify="center">
							<CardPicture />
						</Grid>
					</div>
					<br />
					<br />
					<br />
					<div style={{ textAlign: 'center' }}>
						<MuiThemeProvider theme={theme}>
							<Button
								variant="extendedFab"
								color="primary"
								className={classes.margin}
								size="large"
								onClick={() => {
									changeVisibilityFalse();
									this.props.navigator.pushPage({
										component: UserForm,
										props: {
											changeVisibilityTrue: () =>
												this.props.changeVisibilityTrue()
										}
									});
								}}
							>
								Pick Trash
							</Button>
						</MuiThemeProvider>
					</div>
				</div>
				{/* <TooltipButton /> */}
			</Page>
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
		color: '#00c43e',
		backgroundColor: '#00c43e',
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
		backgroundColor: '#00c43e',
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
		color: 'black',
		backgroundColor: 'white',
		maxWidth: '350px',
		width: '100%',
		fontWeight: 400,
		'&:hover': {
			backgroundColor: 'white'
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
			color: '#00c43e'
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

const theme = createMuiTheme({
	palette: {
		primary: green
	},
	typography: {
		useNextVariants: true
	}
});

HomeContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContainer);
