import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const styles = {
	root: {
		width: '100%',
		bottom: 0,
		position: 'fixed'
	},
	'&$selected': {
		backgroundColor: 'red'
	}
};

class BottomNavigationBar extends React.Component {
	state = {
		value: 'recents'
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<BottomNavigation
				value={value}
				showLabels
				onChange={this.handleChange}
				className={classes.root}
			>
				<BottomNavigationAction
					label="Home"
					className={classes.action}
					value="recents"
					icon={<HomeIcon />}
					component={Link}
					to="/"
				/>
				<BottomNavigationAction
					label="Order"
					value="favorites"
					icon={<AssignmentIcon />}
					component={Link}
					to="/order"
				/>
				<BottomNavigationAction
					label="Help"
					value="nearby"
					icon={<HelpIcon />}
					component={Link}
					to="/help"
				/>
				<BottomNavigationAction
					label="Account"
					value="folder"
					icon={<AccountIcon />}
					component={Link}
					to="/account"
				/>
			</BottomNavigation>
		);
	}
}

BottomNavigationBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomNavigationBar);
