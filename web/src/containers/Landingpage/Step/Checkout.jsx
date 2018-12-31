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
import { connect } from 'react-redux';
import { createOrderWithoutLogin } from '../../../redux/actions/orderActions';
import { storage } from '../../../services/firebaseConfig';
import { format } from 'date-fns/esm';
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

const themeMui = createMuiTheme({
	overrides: {
		MuiStepIcon: {
			root: {
				'&$completed': {
					color: '#00c43e'
				},
				'&$active': {
					color: '#00c43e'
				}
			}
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
		padding: theme.spacing.unit * 5,
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

function validateName(name) {
	// we are going to store errors for all fields
	// in a signle array
	const errorsName = [];

	if (name.length === 0) {
		errorsName.push('Nama tidak boleh kosong');
	}

	return errorsName;
}

function validateEmail(email) {
	// we are going to store errors for all fields
	// in a signle array
	const errorsEmail = [];
	if (email.length === 0) {
		errorsEmail.push('Email harus memiliki minimal 5 karakter');
	}
	return errorsEmail;
}

function validateAtEmail(email) {
	// we are going to store errors for all fields
	// in a signle array
	const errorsAtEmail = [];
	if (email.split('').filter(x => x === '@').length !== 1) {
		errorsAtEmail.push('Email harus berisikan @gmail');
	}
	return errorsAtEmail;
}

function validateTitikEmail(email) {
	// we are going to store errors for all fields
	// in a signle array
	const errorsTitikEmail = [];
	if (email.indexOf('.') === -1) {
		errorsTitikEmail.push('Email harus berisikan setidaknya 1 titik');
	}
	return errorsTitikEmail;
}

function validatePhone(phone) {
	// we are going to store errors for all fields
	// in a signle array
	const errorsPhone = [];

	if (phone.length === 0) {
		errorsPhone.push('Nomor WhatsApp tidak boleh kosong');
	}
	if (phone.indexOf('+62') === 1) {
		errorsPhone.push('Nomor WhatsApp harus diawali dengan +62');
	}

	return errorsPhone;
}

function validateAddress(address) {
	// we are going to store errors for all fields
	// in a signle array
	const errorsAddress = [];

	if (address.length === 0) {
		errorsAddress.push('Alamat tidak boleh kosong');
	}

	return errorsAddress;
}

function validateEmailValid(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

class Checkout extends React.Component {
	state = {
		activeStep: 0,
		database: [],
		data: [],
		name: '',
		phone: '',
		email: '',
		selectedDate: null,
		anchorEl: null,
		currentLocale: 'id',
		time: null,

		occupation: '',
		city: '',
		bio: '',
		catatan: '',
		address: '',
		foto: [],
		previewGeneralPhotos: [],
		generalPhotos: [],
		downloadURLs: [],
		uploadProgress: 0,
		filenames: [],
		allowSend: false,

		isUploading: false,

		loading: false,
		isInvalid: false,

		errorsName: false,
		errorsAddress: false,
		errorsPhone: false,
		errorsEmail: false,
		errorsAtEmail: false,
		errorsTitikEmail: false,
		errorsDate: false,
		errorAll: false,
		emailInvalid: false
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	};

	handleSubmit = e => {
		const { name, email, phone, address } = this.state;

		const errorsName = validateName(name);
		const errorsAddress = validateAddress(address);
		const errorsPhone = validatePhone(phone);
		const errorsEmail = validateEmail(email);
		const errorsAtEmail = validateAtEmail(email);
		const errorsTitikEmail = validateTitikEmail(email);
		const emailInvalid = validateEmailValid(email);
		if (!emailInvalid) {
			this.setState({
				emailInvalid: true
			});
			setTimeout(() => {
				this.setState({
					emailInvalid: false
				});
			}, 5000);
			console.log('Email Tidak Valid');
		}
		if (
			email.length === 0 &&
			name.length === 0 &&
			phone.length === 0 &&
			address.length === 0
		) {
			this.setState({
				errorAll: true
			});
			setTimeout(() => {
				this.setState({
					errorAll: false
				});
			}, 5000);
			console.log('Kosong Semua?? Tidakkk');
		}
		if (errorsName.length > 0) {
			this.setState({ errorsName: true });
			setTimeout(() => {
				this.setState({
					errorsName: false
				});
			}, 5000);
			return console.log(errorsName);
		}
		if (errorsEmail.length > 0) {
			this.setState({ errorsEmail: true });
			setTimeout(() => {
				this.setState({
					errorsEmail: false
				});
			}, 5000);
			return console.log(errorsEmail);
		}
		if (errorsAtEmail.length > 0) {
			this.setState({ errorsAtEmail: true });
			setTimeout(() => {
				this.setState({
					errorsAtEmail: false
				});
			}, 5000);
			return console.log(errorsEmail);
		}
		if (errorsTitikEmail.length > 0) {
			this.setState({ errorsTitikEmail: true });
			setTimeout(() => {
				this.setState({
					errorsTitikEmail: false
				});
			}, 5000);
			return console.log(errorsEmail);
		}
		if (errorsPhone.length > 0) {
			this.setState({ errorsPhone: true });
			setTimeout(() => {
				this.setState({
					errorsPhone: false
				});
			}, 5000);
			return console.log(errorsPhone);
		}
		if (errorsAddress.length > 0) {
			this.setState({ errorsAddress: true });
			setTimeout(() => {
				this.setState({
					errorsAddress: false
				});
			}, 5000);
			return console.log(errorsAddress);
		}
		console.log(this.state);
		this.handleNext();
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleNextStepTwo = () => {
		const { selectedDate } = this.state;

		if (selectedDate === null || selectedDate === 'null') {
			this.setState({
				errorsDate: true
			});
			setTimeout(() => {
				this.setState({
					errorsDate: false
				});
			}, 5000);
			console.log('Kosong Semua?? Tidakkk', selectedDate);
		} else {
			this.handleNext();
		}
	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	handleSendOrder = () => {
		this.setState({
			allowSend: true
		});
	};

	allowSend = () => {
		this.setState({
			allowSend: true
		});
	};
	// Handle fields change
	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	};

	handleChangeFoto = input => event => {
		var dataPhotos = Array.from(event.target.files);
		this.setState({ [input]: dataPhotos });
	};

	deleteImage = params => {
		const { previewGeneralPhotos } = this.state;
		previewGeneralPhotos.splice(params, 1);
		this.setState({
			previewGeneralPhotos
		});
	};

	onDropGeneral = currentGeneralPhoto => {
		let index;
		for (index = 0; index < currentGeneralPhoto.length; ++index) {
			const file = currentGeneralPhoto[index];
			this.setState(({ previewGeneralPhotos }) => ({
				previewGeneralPhotos: previewGeneralPhotos.concat(file)
			}));
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = event => {
				this.setState({
					generalPhotos: this.state.generalPhotos.concat([
						{ base64: event.target.result }
					])
				});
			};
		}
	};

	isLoading = () => {
		this.setState({
			loading: true
		});
	};

	isLoaded = () => {
		this.setState({
			loading: false
		});
	};

	handleUpload = () => {
		const { previewGeneralPhotos } = this.state;
		if (previewGeneralPhotos !== [] || previewGeneralPhotos.length > 0) {
			const promises = [];
			previewGeneralPhotos.forEach(file => {
				const uploadTask = storage.ref(`images/${file.name}`).put(file);
				promises.push(uploadTask);

				uploadTask.on(
					'state_changed',
					snapshot => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(progress);
						this.setState({
							loading: true
						});
					},
					error => {
						console.log(error);
					},
					() => {
						uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
							console.log(downloadURL);
							console.log(downloadURL);
							this.setState(oldState => ({
								downloadURLs: [...oldState.downloadURLs, downloadURL]
							}));
							console.log(this.state.downloadURLs);
							if (
								this.state.downloadURLs.length ===
								this.state.previewGeneralPhotos.length
							) {
								this.allowSend();
								this.isLoaded();
								this.handleNext();
								this.props.createOrder(this.state);
							}
						});
					}
				);
			});

			Promise.all(promises).then(tasks => {
				console.log('all uploads complete', tasks);
				this.setState({
					loading: false
				});
			});
		} else {
			this.props.createOrder(this.state);
			this.handleNext();
		}
	};

	handleCreateOrder = () => {
		this.props.createOrder(this.state);
		this.handleNext();
	};

	handleCreateOrderWithPicture = () => {
		const { allowSend } = this.state;
		if (allowSend) {
			console.log('Gambar Terkirim');
			this.props.createOrder(this.state);
			this.handleNext();
		}
		return console.log('Gambar Belum terkirim');
	};

	handleDateChange = date => {
		this.setState({ selectedDate: date });
		console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
	};

	handleMenuOpen = event => {
		event.stopPropagation();
		this.setState({ anchorEl: event.currentTarget });
		console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
	};

	handleTimeChange = date => {
		this.setState({ time: date });
		console.log(format(this.state.time, 'HH:mm'));
	};

	selectLocale = selectedLocale => {
		this.setState({
			currentLocale: selectedLocale,
			anchorEl: null
		});
	};

	setFirstStepItem = () => {
		sessionStorage.setItem('name', this.state.name);
		sessionStorage.setItem('email', this.state.email);
		sessionStorage.setItem('phone', this.state.phone);
		sessionStorage.setItem('address', this.state.address);
	};

	setSecondStepItem = () => {
		sessionStorage.setItem('date', this.state.selectedDate);
	};

	getSafe = () => {
		let name = sessionStorage.getItem('name');
		let email = sessionStorage.getItem('email');
		let phone = sessionStorage.getItem('phone');
		let address = sessionStorage.getItem('address');
		let date = sessionStorage.getItem('date');
		
		try {
			if(name){
				this.setState({
					name: name
				})
			}
			if(email){
				this.setState({
					email: email
				})
			}
			if(phone){
				this.setState({
					phone: phone
				})
			}
			if(address){
				this.setState({
					address: address
				})
			}
			if(date){
				this.setState({
					selectedDate: date
				})
			}
		}
		catch (e){
			return console.error(e)
		}
	};

	componentDidMount(){
		this.getSafe()
	}

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;
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
		} = this.state;
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
							nextStep={this.handleSubmit}
							handleChange={this.handleChange}
							values={values}
							setFirstStepItem={this.setFirstStepItem}
						/>
					);
				case 1:
					return (
						<SecondStep
							previousStep={this.handleBack}
							nextStep={this.handleNext}
							handleChange={this.handleChange}
							values={values}
							prevStep={this.prevStep}
							handleChangeFoto={this.handleChangeFoto}
							onDropGeneral={this.onDropGeneral}
							deleteImage={this.deleteImage}
							handleChangeTime={this.handleChangeTime}
							allowSend={this.allowSendOrder}
							handleDateChange={this.handleDateChange}
							handleTimeChange={this.handleTimeChange}
							handleMenuOpen={this.handleMenuOpen}
							handleMenuClose={this.handleMenuClose}
							handleNextStepTwo={this.handleNextStepTwo}
							setSecondStepItem={this.setSecondStepItem}
						/>
					);
				case 2:
					return (
						<ThirdStep
							previousStep={this.handleBack}
							nextStep={this.handleNext}
							handleChange={this.handleChange}
							values={values}
						/>
					);
				case 3:
					return (
						<Review
							allData={this.state}
							values={values}
							handleCreateOrder={this.handleCreateOrder}
							previousStep={this.handleBack}
							isLoading={this.isLoading}
							handleUpload={this.handleUpload}
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
								<Toolbar>
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
								<Toolbar>
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
										variant="h7"
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
								<Toolbar>
									<IconButton
										onClick={this.handleBack}
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<ArrowLeft />
									</IconButton>
									<Typography
										variant="h7"
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
											<Button varian="contained"
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
											<Button varian="contained"
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

const mapDispatchToProps = dispatch => {
	return {
		createOrder: order => {
			dispatch(createOrderWithoutLogin(order));
		}
	};
};

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withRouter(Checkout)));
