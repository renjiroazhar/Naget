import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
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
		margin: theme.spacing.unit,
		backgroundColor: '#00c43e',
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#0062cc',
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
		this.props.saveData(this.state);
		this.props.nextStep();
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
						<Button
							style={{ marginBottom: '100px' }}
							variant="contained"
							color="primary"
							className={classes.button}
						>
							Input Foto Trash
							<AddIcon className={classes.rightIcon} />
						</Button>
					</Grid>

					<Grid item xs={12} sm={12}>
						<div>
							<Button
								style={{
									float: 'left',
									backgroundColor: 'red',
									color: 'white'
								}}
								onClick={this.handleBack}
								className={classes.button}
							>
								Kembali
							</Button>
						</div>

						<div
							style={{
								textAlign: 'right',
								justifyContent: 'right',
								float: 'right'
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleSubmit}
								className={classes.button}
								style={{ float: 'right' }}
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
