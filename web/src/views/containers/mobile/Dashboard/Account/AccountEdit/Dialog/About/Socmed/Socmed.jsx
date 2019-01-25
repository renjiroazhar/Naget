import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Facebook from '../images/facebook.png';
import Twitter from '../images/twitter.png';
import Whatsapp from '../images/whatsapp.png';
import Gmail from '../images/gmail.png';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: 50,
		width: 50,
		borderRadius: 7
	},
	control: {
		padding: theme.spacing.unit * 2
	}
});

class Socmed extends React.Component {
	state = {
		spacing: '40'
	};

	handleChange = key => (event, value) => {
		this.setState({
			[key]: value
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div
				style={{
					overflow: 'hidden',
					display: 'flex',
					justifyContent: 'space-between',
					margin: 0,
					padding: 20
				}}
			>
				<img src={Facebook} alt="" className={classes.paper} />
				<img src={Twitter} alt="" className={classes.paper} />
				<img src={Whatsapp} alt="" className={classes.paper} />
				<img src={Gmail} alt="" className={classes.paper} />
			</div>
		);
	}
}

Socmed.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Socmed);
