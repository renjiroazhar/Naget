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
import FixedNavbar from '../../../component/FixedNavbar';
import { connect } from 'react-redux';
import { createOrder } from '../../../redux/actions/orderActions';
import { storage } from '../../../services/firebaseConfig';

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#559351'
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
	}
});

class Checkout extends React.Component {
	state = {
		activeStep: 0,
		database: [],
		data: [],
		name: '',
		phone: '',
		email: '',
		time: '',
		occupation: '',
		city: '',
		bio: '',
		address: '',
		foto: [],
		previewGeneralPhotos: [],
		generalPhotos: [],
		downloadURLs: [],
		uploadProgress: 0,
		filenames: [],
		allowSend: false,

		isUploading: false,

		loading: false
	};
	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
		console.log(this.state);
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
		console.log(this.state.database);
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
		console.log(this.state);
	};

	handleChangeFoto = input => event => {
		var dataPhotos = Array.from(event.target.files);
		this.setState({ [input]: dataPhotos });
		console.log(this.state.foto);
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

	handleChangeTime = time => {
		this.setState({
			time: time
		});
	};

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;

		const steps = ['', '', '', ''];
		const {
			name,
			phone,
			email,
			time,
			occupation,
			city,
			bio,
			address,
			foto,
			generalPhotos,
			previewGeneralPhotos,
			downloadURLs,
			loading,
			allowSend
		} = this.state;
		const values = {
			name,
			phone,
			allowSend,
			time,
			email,
			address,
			occupation,
			city,
			bio,
			foto,
			loading,
			generalPhotos,
			previewGeneralPhotos,
			downloadURLs
		};

		const getStepContent = step => {
			switch (step) {
				case 0:
					return (
						<FirstStep
							nextStep={this.handleNext}
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
					<FixedNavbar />
					<main className={classes.layout}>
						<Paper className={classes.paper}>
							<Stepper activeStep={activeStep} className={classes.stepper}>
								{steps.map(label => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
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
			dispatch(createOrder(order));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(Checkout));
