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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const themeMui = createMuiTheme({
	overrides: {
		MuiBottomNavigation: {
			root: {
				'&$selected': {
					color: 'red'
				}
			}
		},
		MuiBottomNavigationAction: {
			root: {
				'&$selected': {
					color: 'green',
					backgroundColor: 'green'
				}
			},
			'&$selected': {
				color: 'red'
			}
		},
		step: {
			'& $completed': {
				color: 'lightgreen'
			},
			'& $active': {
				color: 'pink'
			},
			'& $disabled': {
				color: 'red'
			}
		},
		alternativeLabel: {},
		active: {}, //needed so that the &$active tag works
		completed: {},
		disabled: {},
		labelContainer: {
			'& $alternativeLabel': {
				marginTop: 0
			}
		}
	}
});

const styles = theme => ({
	root: {
		width: '100%',
		bottom: 0,
		position: 'fixed'
	},
	'&$iconOnly': {
		paddingTop: 16
	},
	'&$selected': {
		paddingTop: 6,
		color: theme.palette.primary.main
	}
});

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
				showLabels={true}
				onChange={this.handleChange}
				className={classes.root}
			>
				<MuiThemeProvider theme={themeMui}>
					<BottomNavigationAction
						label="Home"
						className={classes.action}
						value="recents"
						icon={<HomeIcon />}
						component={Link}
						to="/"
						showLabel
					/>
				</MuiThemeProvider>
				<MuiThemeProvider theme={themeMui}>
					<BottomNavigationAction
						label="Order"
						value="favorites"
						icon={<AssignmentIcon />}
						component={Link}
						to="/order"
						showLabel
					/>
				</MuiThemeProvider>
				<MuiThemeProvider theme={themeMui}>
					<BottomNavigationAction
						label="Help"
						value="nearby"
						showLabel
						icon={<HelpIcon />}
						component={Link}
						to="/help"
					/>
				</MuiThemeProvider>
				<MuiThemeProvider theme={themeMui}>
					<BottomNavigationAction
						label="Account"
						value="folder"
						showLabel
						icon={<AccountIcon />}
						component={Link}
						to="/account"
					/>
				</MuiThemeProvider>
			</BottomNavigation>
		);
	}
}

BottomNavigationBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomNavigationBar);
