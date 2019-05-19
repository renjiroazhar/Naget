import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Whatsapp from '../images/whatsapp.png';
import Gmail from '../images/gmail.png';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: 50,
		width: 50,
		borderRadius: 7,
		margin: '0px 10px 0px 10px'
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
					margin: 0,
					padding: 20
				}}
			>
				<center>
					<img src={Whatsapp} alt="" className={classes.paper} />
					<img src={Gmail} alt="" className={classes.paper} />
				</center>
			</div>
		);
	}
}

Socmed.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Socmed);
