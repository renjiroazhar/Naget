import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

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
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<List>
							<ListItem>
								<Avatar>
									<ImageIcon />
								</Avatar>
								<ListItemText primary="Photos" secondary="Jan 9, 2014" />
							</ListItem>

							<hr />
						</List>
					</Grid>
					<Grid item xs={12}>
						<List>
							<ListItem>
								<Avatar>
									<BeachAccessIcon />
								</Avatar>
								<ListItemText primary="Vacation" secondary="July 20, 2014" />
							</ListItem>
							<hr />
						</List>
					</Grid>

					<Grid item xs={12}>
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
					</Grid>
					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',

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
									color: 'white'
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
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThirdStep);
