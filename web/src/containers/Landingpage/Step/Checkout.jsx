import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import Review from './Review';
import ThirdStep from './ThirdStep';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import checkIcon from '../../../assets/img/checkicon.jpg';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import './style/style.css';

import idLocale from 'date-fns/locale/id';

import { stepContext } from '../../../context/StepProvider';

const themeMui = createMuiTheme({
	overrides: {
		MuiStepIcon: {
			root: {
				'&$completed': {
					color: '#00c43e',
				},
				'&$active': {
					color: '#00c43e'
				},
				fontSize: 'xx-large'
			}
		},
		typography: {
			useNextVariants: true,
			suppressDeprecationWarnings: true
		},
		step: {
			'& $completed': {
				color: 'lightgreen'
			},
			'& $active': {
				color: 'pink'
			},
			'& $disabled': {
				color: 'red'
			}
		},
		alternativeLabel: {},
		active: {}, //needed so that the &$active tag works
		completed: {},
		disabled: {},
		labelContainer: {
			'& $alternativeLabel': {
				marginTop: 0
			}
		}
	}
});

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#559351'
	},
	stepIcon: {
		color: 'red'
	},
	step: {
		'& $completed': {
			color: 'lightgreen'
		},
		'& $active': {
			color: 'pink'
		},
		'& $disabled': {
			color: 'red'
		}
	},
	alternativeLabel: {},
	active: {}, //needed so that the &$active tag works
	completed: {},
	disabled: {},
	labelContainer: {
		'& $alternativeLabel': {
			marginTop: 0
		}
	},
	completedStep: {
		color: 'red'
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
		padding: 17,
		width: '100%',
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 3
		}
	},
	button: {
		backgroundColor: '#00c43e',
		height: '46px',
		'&:hover': {
			backgroundColor: '#00c43e',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#00c43e',
			borderColor: '#005cbf'
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
		}
	},
	buttonTwo: {
		backgroundColor: '#FFFFFF',
		borderColor: '#00c43e',
		height: '46px',
		color: '#00c43e',
		border: '1px solid #00c43e',
		'&:hover': {
			backgroundColor: '#00c43e',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#00c43e',
			borderColor: '#005cbf'
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
		}
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	}
});

class Checkout extends React.Component {

	render() {
		const { classes } = this.props;
		const { activeStep } = this.context.state;
		const locale = idLocale;
		const localeMap = {
			id: idLocale
		};

		const steps = ['', '', '', ''];
		const {
			name,
			phone,
			email,
			selectedDate,
			anchorEl,
			currentLocale,
			time,
			occupation,
			city,
			bio,
			address,
			foto,
			generalPhotos,
			previewGeneralPhotos,
			downloadURLs,
			catatan,
			loading,
			allowSend,
			isInvalid,
			errorAll,
			errorsName,
			errorsPhone,
			errorsAddress,
			errorsEmail,
			errorsTitikEmail,
			errorsAtEmail,
			errorsDate,
			emailInvalid
		} = this.context.state;
		const values = {
			name,
			phone,
			allowSend,
			selectedDate,
			anchorEl,
			currentLocale,
			time,
			isInvalid,
			locale,
			localeMap,
			errorsName,
			errorsPhone,
			errorsAddress,
			errorsEmail,
			errorsTitikEmail,
			errorsAtEmail,
			email,
			catatan,
			address,
			occupation,
			city,
			bio,
			foto,
			loading,
			generalPhotos,
			previewGeneralPhotos,
			downloadURLs,
			errorsDate,

			errorAll,
			emailInvalid
		};

		const getStepContent = step => {
			switch (step) {
				case 0:
					return (
						<FirstStep
							nextStep={this.context.handleSubmit}
							handleChange={this.context.handleChange}
							values={values}
							setFirstStepItem={this.context.setFirstStepItem}
						/>
					);
				case 1:
					return (
						<SecondStep
							previousStep={this.context.handleBack}
							nextStep={this.context.handleNext}
							handleChange={this.context.handleChange}
							values={values}
							prevStep={this.context.prevStep}
							handleChangeFoto={this.context.handleChangeFoto}
							onDropGeneral={this.context.onDropGeneral}
							deleteImage={this.context.deleteImage}
							handleChangeTime={this.context.handleChangeTime}
							allowSend={this.context.allowSendOrder}
							handleDateChange={this.context.handleDateChange}
							handleTimeChange={this.context.handleTimeChange}
							handleMenuOpen={this.context.handleMenuOpen}
							handleMenuClose={this.context.handleMenuClose}
							handleNextStepTwo={this.context.handleNextStepTwo}
							setSecondStepItem={this.context.setSecondStepItem}
						/>
					);
				case 2:
					return (
						<ThirdStep
							previousStep={this.context.handleBack}
							nextStep={this.context.handleNext}
							handleChange={this.context.handleChange}
							values={values}
						/>
					);
				case 3:
					return (
						<Review
							allData={this.context.state}
							values={values}
							handleCreateOrder={this.context.handleCreateOrder}
							previousStep={this.context.handleBack}
							isLoading={this.context.isLoading}
							handleUpload={this.context.handleUpload}
						/>
					);
				default:
					throw new Error('Unknown step');
			}
		};

		return (
			<div
				style={{
					width: '-webkit-fill-available',
					height: '100%',
					marginTop: '10px'
				}}
			>
				<React.Fragment>
					{activeStep === 0 ? (
						<div
							style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1000 }}
						>
							<AppBar
								style={{ width: '100%', backgroundColor: '#00c43e' }}
								position="static"
							>
								<Toolbar style={{ paddingLeft: 0 }}>
									<IconButton
										onClick={() => {
											this.props.history.push('/');
										}}
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<ArrowLeft />
									</IconButton>
									<Typography
										variant="h6"
										color="inherit"
										className={classes.grow}
									>
										Fill in the Biodata's
									</Typography>
								</Toolbar>
							</AppBar>
						</div>
					) : activeStep === 4 ? (
						<div
							style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1000 }}
						>
							<AppBar
								style={{ width: '100%', backgroundColor: '#00c43e' }}
								position="static"
							>
								<Toolbar style={{ paddingLeft: 0 }}>
									<IconButton
										onClick={() => {
											this.props.history.push('/');
										}}
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<ArrowLeft />
									</IconButton>
									<Typography
										variant="h6"
										color="inherit"
										className={classes.grow}
									>
										{activeStep === 1
											? 'Date, Time, and Photo'
											: activeStep === 2
											? 'Trash list and Price'
											: activeStep === 3
											? 'Confirm Order'
											: activeStep === 4
											? 'Order Successful'
											: ''}
									</Typography>
								</Toolbar>
							</AppBar>
						</div>
					) : (
						<div
							style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1000 }}
						>
							<AppBar
								style={{ width: '100%', backgroundColor: '#00c43e' }}
								position="static"
							>
								<Toolbar style={{ paddingLeft: 0 }}>
									<IconButton
										onClick={() => {
											this.props.history.push('/');
										}}
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<ArrowLeft />
									</IconButton>
									<Typography
										variant="h6"
										color="inherit"
										className={classes.grow}
									>
										{activeStep === 1
											? 'Date, Time, and Photo'
											: activeStep === 2
											? 'Trash list and Price'
											: activeStep === 3
											? 'Confirm Order'
											: activeStep === 4
											? 'Order Successful'
											: ''}
									</Typography>
								</Toolbar>
							</AppBar>
						</div>
					)}
					<CssBaseline />
					<br />
					<br />
					<main className={classes.layout}>
						<Paper className={classes.paper}>
							{activeStep === 4 || activeStep > 3 ? (
								''
							) : (
								<MuiThemeProvider theme={themeMui}>
									<Stepper activeStep={activeStep} className={classes.stepper}>
										{steps.map(label => (
											<Step key={label}>
												<StepLabel
													StepIconProps={{
														classes: {
															active: classes.stepIcon,
															completed: classes.completedStep
														}
													}}
												>
													{label}
												</StepLabel>
											</Step>
										))}
									</Stepper>
								</MuiThemeProvider>
							)}

							<React.Fragment>
								{activeStep === steps.length ? (
									<React.Fragment>
										<div style={{ textAlign: 'center' }}>
											<img
												src={checkIcon}
												alt="check"
												width="100"
												height="100"
											/>
										</div>
										<Typography
											variant="h5"
											style={{
												textAlign: 'center',
												color: '#757575',
												justifyContent: 'center'
											}}
											gutterBottom
										>
											<div
												style={{
													fontWeight: 'bold',
													marginRight: '5px',
													color: '#757575',
													marginTop: '10px'
												}}
											>
												Thank You,
											</div>{' '}
											{values.name}
										</Typography>
										<Typography
											variant="subtitle1"
											style={{ textAlign: 'center', color: '#757575' }}
										>
											Thank You for order, let's register your account so you
											can monitor your order in real time and get additional
											points.
										</Typography>

										<Typography
											variant="subtitle2"
											style={{
												textAlign: 'center',
												color: '#757575',
												fontSize: '12px',
												fontWeight: 600
											}}
										>
											*Order details have been sent to your email.
										</Typography>

										<div
											style={{
												textAlign: 'center',
												justifyContent: 'center',
												width: '100%',
												marginTop: '10%'
											}}
										>
											<Button
												variant="contained"
												color="primary"
												onClick={() => {
													this.props.history.push('/login');
												}}
												className={classes.buttonTwo}
												style={{ width: '100%' }}
											>
												Login
											</Button>
										</div>

										<div
											style={{
												textAlign: 'center',
												justifyContent: 'center',
												width: '100%',
												marginTop: '5%'
											}}
										>
											<Button
												variant="contained"
												color="primary"
												onClick={() => {
													this.props.history.push('/signup');
												}}
												className={classes.button}
												style={{ width: '100%' }}
											>
												Register
											</Button>
										</div>
									</React.Fragment>
								) : (
									<React.Fragment>
										{getStepContent(activeStep)}
										<div>{activeStep === steps.length - 1 ? '' : ''}</div>
									</React.Fragment>
								)}
							</React.Fragment>
						</Paper>
					</main>
				</React.Fragment>
			</div>
		);
	}
}

Checkout.propTypes = {
	classes: PropTypes.object.isRequired
};

Checkout.contextType = stepContext;

const styledCheckout = withStyles(styles)(withRouter(Checkout));

export { styledCheckout as Checkout };
