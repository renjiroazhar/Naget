import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Recycle from './image/svg/009-recycle.svg';
import Recycling from './image/svg/011-recycling.svg';
import Totebag from './image/svg/004-tote-bag.svg';
import RecycleBin from './image/svg/012-recycle-bin.svg';
import Green from './image/svg/025-green.svg';
import './style/carousel.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
	{
		imgPath: `${RecycleBin}`
	},
	{
		imgPath: `${Recycling}`
	},
	{
		imgPath: `${Green}`
	},
	{
		imgPath: `${Recycle}`
	},
	{
		imgPath: `${Totebag}`
	}
];

const styles = theme => ({
	root: {
		maxWidth: 'auto'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		backgroundColor: theme.palette.background.default
	},
	img: {
		height: 150,
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
			<div style={{ width: '90%' }}>
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
						<Button varian="contained"
							size="small"
							onClick={this.handleNext}
							disabled={activeStep === maxSteps - 1}
						/>
					}
					backButton={
						<Button varian="contained"
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
