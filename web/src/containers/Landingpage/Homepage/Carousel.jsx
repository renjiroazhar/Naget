import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import DropTrash from '../../../assets/img/png/DropTrash.png';
import TrashScale from '../../../assets/img/png/TrashScale.png';
import TrashDrop from '../../../assets/img/png/TrashDrop.png';
import TrashBag from '../../../assets/img/png/TrashBag.png'
import TrashPoints from '../../../assets/img/png/TrashPoints.png'
import './style/carousel.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
	{
		imgPath: `${DropTrash}`
	},
	{
		imgPath: `${TrashScale}`
	},
	{
		imgPath: `${TrashDrop}`
	},
	{
		imgPath: `${TrashBag}`
	},
	{
		imgPath: `${TrashPoints}`
	}
];

const styles = theme => ({
	root: {
		maxWidth: 200,
		flexGrow: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing.unit * 4,
		backgroundColor: theme.palette.background.default
	},
	img: {
		height: 200,
		display: 'block',
		maxWidth: 200,
		overflow: 'hidden',
		width: '100%'
	}
});

class Carousel extends React.Component {
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1
		}));
	};

	handleStepChange = activeStep => {
		this.setState({ activeStep });
	};

	render() {
		const { classes, theme } = this.props;
		const { activeStep } = this.state;
		const maxSteps = tutorialSteps.length;

		return (
			<div className={classes.root}>
				<AutoPlaySwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={this.handleStepChange}
					enableMouseEvents
				>
					{tutorialSteps.map((step, index) => (
						<div key={step.label}>
							{Math.abs(activeStep - index) <= 2 ? (
								<img
									id="image-carousel"
									className={classes.img}
									src={step.imgPath}
									alt={step.label}
								/>
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
				<MobileStepper
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					className={classes.mobileStepper}
					style={{ backgroundColor: 'transparent' }}
					nextButton={
						<Button
							size="small"
							onClick={this.handleNext}
							disabled={activeStep === maxSteps - 1}
						/>
					}
					backButton={
						<Button
							size="small"
							onClick={this.handleBack}
							disabled={activeStep === 0}
						/>
					}
				/>
			</div>
		);
	}
}

Carousel.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Carousel);
