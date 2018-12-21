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
import NavbarPickTrash from '../../../component/NavbarPickTrash';
import { connect } from 'react-redux';
import { createOrderWithoutLogin } from '../../../redux/actions/orderActions';
import { storage } from '../../../services/firebaseConfig';
import { format } from 'date-fns/esm';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './style/style.css'

import idLocale from 'date-fns/locale/id';

const themeMui = createMuiTheme({
	overrides: {
		Stepper: {
			// Name of the component ⚛️ / style sheet
			icon: {
				color: 'green'
			}
		},
		step: {
			"& $completed": {
			  color: "lightgreen"
			},
			"& $active": {
			  color: "pink"
			},
			"& $disabled": {
			  color: "red"
			}
		  },
		  alternativeLabel: {},
		  active: {}, //needed so that the &$active tag works
		  completed: {},
		  disabled: {},
		  labelContainer: {
			"& $alternativeLabel": {
			  marginTop: 0
			}
		  },
	}
});

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#559351'
	},
	step: {
		"& $completed": {
		  color: "lightgreen"
		},
		"& $active": {
		  color: "pink"
		},
		"& $disabled": {
		  color: "red"
		}
	  },
	  alternativeLabel: {},
	  active: {}, //needed so that the &$active tag works
	  completed: {},
	  disabled: {},
	  labelContainer: {
		"& $alternativeLabel": {
		  marginTop: 0
		}
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
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	button: {
		marginTop: theme.spacing.unit * -4
	},
	
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
	if (email.length < 5) {
		errorsEmail.push('Email harus memiliki minimal 5 karakter');
	}
	if (email.split('').filter(x => x === '@').length !== 1) {
		errorsEmail.push('Email harus berisikan @');
	}
	if (email.indexOf('.') === -1) {
		errorsEmail.push('Email harus berisikan setidaknya 1 titik');
	}
	return errorsEmail;
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
		errorAll: false
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

		this.handleNext();
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
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
		if (this.state.downloadURLs !== [] || this.state.downloadURLs.length > 0) {
			this.setState({
				allowSend: true
			});
		} else {
			this.setState({
				allowSend: false
			});
		}
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
				const uploadTask = storage
					.ref(`images/${previewGeneralPhotos.name}`)
					.put(file);
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
							this.setState(oldState => ({
								downloadURLs: [...oldState.downloadURLs, downloadURL]
							}));
							console.log(this.state.downloadURLs);
							if (
								this.state.downloadURLs.length ===
								this.state.previewGeneralPhotos.length
							) {
								this.handleSendOrder();
								this.isLoaded();
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

	getSafe = (fn, defaultVal) => {
		try {
			return fn();
		} catch (e) {
			return defaultVal;
		}
	};

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
			errorsEmail
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

			errorAll
		};

		const getStepContent = step => {
			switch (step) {
				case 0:
					return (
						<FirstStep
							nextStep={this.handleSubmit}
							handleChange={this.handleChange}
							values={values}
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
					marginTop: '100px',
					width: '-webkit-fill-available',
					height: '100%'
				}}
			>
				<React.Fragment>
					<CssBaseline />
					<NavbarPickTrash />
					<main className={classes.layout}>
						<Paper className={classes.paper}>
							<MuiThemeProvider theme={themeMui}>
								<Stepper activeStep={activeStep} className={classes.stepper}>
									{steps.map(label => (
										<Step key={label}>
											<StepLabel
												classes={{
													alternativeLabel: classes.alternativeLabel,
													labelContainer: classes.labelContainer
												}}
												StepIconProps={{
													classes: {
														root: classes.step,
														completed: classes.completed,
														active: classes.active,
														disabled: classes.disabled
													}
												}}
											>
												{label}
											</StepLabel>
										</Step>
									))}
								</Stepper>
							</MuiThemeProvider>
							<React.Fragment>
								{activeStep === steps.length ? (
									<React.Fragment>
										<Typography variant="h5" gutterBottom>
											Thank you for your order.
										</Typography>
										<Typography variant="subtitle1">
											Your order number is #2001539. We have emailed your order
											confirmation, and will send you an update when your order
											has shipped.
										</Typography>
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
)(withStyles(styles)(Checkout));
