import React from 'react';
import { Toolbar, Page, BackButton } from 'react-onsenui';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import Review from './Review';
import ThirdStep from './ThirdStep';
import { connect } from 'react-redux';
import { createOrder } from '../../../../redux/actions/orderActions';

import HomeContainer from '../HomeContainer';

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
	pushPage() {
		this.props.navigator.pushPage({ component: HomeContainer });
	}

	popPage() {
		this.props.navigator.popPage();
	}

	state = {
		activeStep: 0,
		database: [],
		data: []
	};

	addDataFormOtherComponent = value => {
		const database = this.state.database;
		database.push(value);
		console.log(value);
		console.log(this.state.database);
	};

	getChildState(childrenName, childrenState) {
		this.setState({ childrenName: childrenState }); //with click Save button in FirstChildren you will get state of this component
	}

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

	renderToolbar() {
		return (
			<Toolbar
				transparent
				noshadow
				style={{ height: '56px', backgroundColor: '#333c4e' }}
			>
				<div className="left">
					<BackButton onClick={this.popPage}>Back</BackButton>
				</div>
				<div
					className="center"
					style={{
						lineHeight: '56px',
						display: 'block',
						textAlign: 'center',
						marign: 'auto',
						color: 'white'
					}}
				/>
				<div className="right">
					<BackButton icon="md-menu">Back</BackButton>
				</div>
			</Toolbar>
		);
	}

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;

		const steps = ['', '', '', ''];

		const getStepContent = step => {
			switch (step) {
				case 0:
					return (
						<FirstStep
							saveData={this.addDataFormOtherComponent}
							nextStep={this.handleNext}
						/>
					);
				case 1:
					return (
						<SecondStep
							saveData={this.addDataFormOtherComponent}
							previousStep={this.handleBack}
							nextStep={this.handleNext}
						/>
					);
				case 2:
					return (
						<ThirdStep
							saveData={this.addDataFormOtherComponent}
							previousStep={this.handleBack}
							nextStep={this.handleNext}
						/>
					);
				case 3:
					return <Review allData={this.state} />;
				default:
					throw new Error('Unknown step');
			}
		};
		return (
			<Page renderToolbar={this.renderToolbar}>
				<div
					style={{
						marginTop: '50px',
						width: '-webkit-fill-available',
						height: '100%'
					}}
				>
					<React.Fragment>
						<CssBaseline />

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
												Your order number is #2001539. We have emailed your
												order confirmation, and will send you an update when
												your order has shipped.
											</Typography>
										</React.Fragment>
									) : (
										<React.Fragment>
											{getStepContent(activeStep)}
											<div>
												{activeStep === steps.length - 1 ? (
													<div>
														<Button
															variant="contained"
															color="primary"
															onClick={this.handleNext}
															className={classes.button}
															style={{ float: 'right' }}
														>
															Proses Sekarang
														</Button>
													</div>
												) : (
													''
												)}
											</div>
										</React.Fragment>
									)}
								</React.Fragment>
							</Paper>
						</main>
					</React.Fragment>
				</div>
			</Page>
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
