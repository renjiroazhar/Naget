import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/StarBorder';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#16a085'
	},
	flex: {
		flex: 1
	},
	cssLabel: {
		color: '#999',
		'&$cssFocused': {
			color: '#000000'
		}
	},
	cssFocused: {},
	cssUnderline: {
		width: '100%',
		borderColor: '#fff',
		color: '#000',
		borderBottomColor: '#000000',
		'&:before': {
			borderBottomColor: '#000000'
		},
		'&:after': {
			borderBottomColor: '#000000'
		},
		'&:hover': {
			borderBottomColor: '#000000'
		}
	},
	margin: {
		margin: theme.spacing.unit,
		maxWidth: '350px',
		width: '100%',
		fontWeight: 400,
		color: 'white',
		backgroundColor: '#fecb00ff',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#fecb00ff'
		}
	},
	form: {
		textAlign: 'center'
	}
});

class Rate extends React.Component {
	state = {
		open: false,
		currentPassword: '',
		newPassword: '',
		isOpen: false
	};

	onChangeTab = selectedTab => {
		this.setState({
			selectedTab: selectedTab
		});
	};

	handleOpen = () => {
		this.setState({
			isOpen: true
		});
	};

	handleClose = () => {
		this.setState({
			isOpen: false
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div style={{ backgroundColor: 'white' }}>
				<List className={classes.list}>
					<ListItem button onClick={this.handleOpen}>
						<ListItemIcon>
							<StarIcon />
						</ListItemIcon>
						<ListItemSecondaryAction>
							<ListItemText
								style={{ fontSize: '24px' }}
								inset
								primary="Rate GMB"
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</div>
		);
	}
}

Rate.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Rate));
