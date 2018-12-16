import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HelpIcon from '@material-ui/icons/Help';
import imageFaq from './svg/help.svg';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#333c4e'
	},
	root: {
		width: '100%',
		marginTop: '10px'
	},
	content: {
		textAlign: 'left'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		textAlign: 'left'
	},
	image: {
		margin: '40px 0 10px 0'
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
		backgroundColor: '#00c43e',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#00c43e'
		}
	},
	form: {
		textAlign: 'center'
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Faq extends React.Component {
	state = {
		open: false,
		currentPassword: '',
		newPassword: ''
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<div style={{ backgroundColor: 'white' }}>
				<List
					onClick={this.handleClickOpen}
					className={classes.list}
					style={{ paddingBottom: '10px' }}
				>
					<ListItem button onClick={this.handleClickOpen}>
						<ListItemIcon>
							<HelpIcon style={{ fontSize: '24px', color: 'cornflowerblue' }} />
						</ListItemIcon>
						<ListItemSecondaryAction>
							<ListItemText style={{ fontSize: '24px' }} inset primary="Faq" />
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close"
							>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" className={classes.flex}>
								Faq
							</Typography>
						</Toolbar>
					</AppBar>
					<div style={{ textAlign: 'center' }}>
						<img
							src={imageFaq}
							width="200"
							height="200"
							alt="FAQ Logo"
							retina_logo_url=""
							className={classes.image}
						/>
					</div>
					<div className={classes.root}>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>
									Apakah Moretrash Itu?
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>
									Bagaimana cara menukarkan sampah?
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				</Dialog>
			</div>
		);
	}
}

Faq.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);
