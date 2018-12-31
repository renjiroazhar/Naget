import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
	card2: {
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
		backgroundColor: '#1ABC9C',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#1ABC9C'
		}
	},
	cardBar: {
		backgroundColor: '#1ABC9C',
		padding: '10px 20px 30px 20px'
	},
	text: {
		fontSize: '35px',
		textDecoration: 'bold',
		margin: '10px 0 0 0'
	}
});

const CardPicture = props => {
	return (
		<div style={{ width: '100%', margin: 0 }}>
			<Card id="card-view" style={{ width: '100%' }}>
				<CardHeader
					style={{
						backgroundColor: '#00c43e',
						paddingTop: 0,
						paddingBottom: 0,
						height: 30,
						fontSize: '15px'
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
								Your points
							</h5>
							<h5
								style={{
									fontWeight: 'normal',
									fontSize: 'initial',
									float: 'right',
									color: 'white'
								}}
							>
								100 pts
							</h5>
						</div>
					}
				/>

				<CardContent style={{ height: 100, }}>
					<div>
						<Typography style={{ textAlign: 'center', marginBottom: '2%', }}>
							You has exchanged rubbish with Moretrash for a number of:
						</Typography>
					</div>
					<Typography
						align="center"
						style={{
							textAlign: 'center',
							fontWeight: 'bold',
							fontSize: '20px'
						}}
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
