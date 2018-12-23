import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import NewsPaper from './images/pexels-photo-167538.jpeg';
import MixPaper from './images/book-address-book-learning-learn-159751.jpeg';
import BoxPaper from './images/chuttersnap-496714-unsplash.jpg';
import Hvs from './images/pexels-photo-209137.jpeg';
import PlasticCup from './images/gelas aqua.jpg';
import PlasticBottle from './images/pexels-photo-802221.jpeg';
import Can from './images/cans-fuzzy-drinks.jpg';

const styles = theme => ({
	root: {
		width: '100%',

		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	button: {
		backgroundColor: '#1ABC9C',
		height: '46px',
		'&:hover': {
			backgroundColor: '#1ABC9C',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#1ABC9C',
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

class ThirdStep extends React.Component {
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
					<h2>Kategori Sampah</h2>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={NewsPaper}
								title="Kertas Koran"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Kertas Koran</p>
									</b>
									<p>Rp. 1000/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={MixPaper}
								title="Kertas Campur"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Kertas Campur</p>
									</b>
									<p>Rp. 300/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={BoxPaper}
								title="Kertas Kardus"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Kertas Kardus</p>
									</b>
									<p>Rp. 750/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={Hvs}
								title="Kertas HVS"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Kertas HVS</p>
									</b>
									<p>Rp. 1000/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={PlasticCup}
								title="Gelas plastik air Mineral"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Gelas plastik air Mineral</p>
									</b>
									<p>Rp. 1000/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={PlasticBottle}
								title="Botol Plastik"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Botol plastik</p>
									</b>
									<p>Rp. 1000/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cover}
								image={Can}
								title="Kaleng Alumunium"
							/>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<b>
										<p>Kaleng Alumunium</p>
									</b>
									<p>Rp. 1400/kg</p>
								</CardContent>
							</div>
						</Card>
					</Grid>

					{/* <Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',
								width: '100%',
								marginTop: '10%'
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleBack}
								style={{
									width: '100%',
									backgroundColor: 'red',
									color: 'white',
									height: '46px'
								}}
							>
								Kembali
							</Button>
						</div>
					</Grid> */}
					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',
								marginTop: '10%',
								width: '100%'
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleSubmit}
								className={classes.button}
								style={{
									width: '100%',
									backgroundColor: '#1ABC9C',
									color: 'white',
									marginTop: '10%'
								}}
							>
								Selanjutnya
							</Button>
						</div>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

ThirdStep.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles)(ThirdStep);
