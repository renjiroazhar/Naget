import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
	card2: {
		maxWidth: '380px',
		width: '90%'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	margin: {
		margin: theme.spacing.unit,
		maxWidth: '350px',
		width: '100%',
		fontWeight: 400,
		color: 'white',
		backgroundColor: '#00c43e',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#00c43e'
		}
	},
	cardBar: {
		backgroundColor: '#00c43e',
		padding: '10px 20px 30px 20px'
	},
	text: {
		fontSize: '35px',
		textDecoration: 'bold',
		margin: '10px 0 0 0'
	}
});

const CardPicture = props => {
	const { classes } = props;

	return (
		<div className={classes.card2}>
			<Card id="card-view" className={classes.card}>
				<CardHeader
					style={{
						backgroundColor: '#00c43e',
						paddingTop: 0,
						paddingBottom: 0
					}}
					title={
						<div>
							<h5
								style={{
									fontWeight: 'normal',
									fontSize: 'initial',
									float: 'left',
									color: 'white'
								}}
							>
								User
							</h5>
							<h5
								style={{
									fontWeight: 'normal',
									fontSize: 'initial',
									float: 'right',
									color: 'white'
								}}
							>
								User
							</h5>
						</div>
					}
				/>

				<CardContent>
					<div>
						<Typography>Telah menukarkan sampah kepada</Typography>
						<Typography>moretrash sejumlah:</Typography>
					</div>
					<Typography
						className={classes.text}
						align="center"
						style={{ textAlign: 'center' }}
					>
						50 KG
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

CardPicture.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardPicture);
