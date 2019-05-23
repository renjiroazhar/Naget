import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import NagetMenu from '../../../../../assets/img/png/promo.png';

const styles = theme => ({
	root: {
		width: '100%',

		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	button: {
		backgroundColor: '#fecb00ff',
		height: '46px',
		'&:hover': {
			backgroundColor: '#fecb00ff',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#fecb00ff',
			borderColor: '#005cbf'
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
		}
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	card: {
		display: 'flex',
		height: '100px',
		marginBottom: '15px'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto'
	},
	cover: {
		width: '91px',
		height: '91px'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit
	},
	playIcon: {
		height: 38,
		width: 38
	},
	p: {
		fontSize: '11px'
	}
});

class FirstStep extends React.Component {
	state = {
		secondary: false
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
		this.props.nextStep();
	};
	handleBack = () => {
		this.props.previousStep();
	};

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Grid className={classes.p} spacing={24}>
					<center><h2>Banana Nugget Varian Menu</h2></center>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={NagetMenu}
								title="Original Banana Nugget"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Original Banana Nugget</p>
									</b>
									<p>No topping</p>
									<p>Rp. 15.000/pack</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={NagetMenu}
								title="Chocolate Banana Naget"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Chocolate Banana Naget</p>
									</b>
									<p>Chocolate topping</p>
									<p>Rp. 16.000/pack</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={NagetMenu}
								title="Cheese Banana Nugget"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Cheese Banana Nugget</p>
									</b>
									<p>Cheese topping</p>
									<p>Rp. 17.000/pack</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={NagetMenu}
								title="Special Banana Nugget"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Special Banana Nugget</p>
									</b>
									<p>Chocolate and cheese topping</p>
									<p>Rp. 18.000/pack</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',
								marginTop: '10%',
								width: '100%'
							}}
						>
							<Button
								varian="contained"
								variant="contained"
								color="primary"
								onClick={this.handleSubmit}
								className={classes.button}
								style={{
									width: '100%',
									backgroundColor: '#fecb00ff',
									color: 'white',
									marginTop: '10%'
								}}
							>
								Next
							</Button>
						</div>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

FirstStep.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FirstStep);
