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
		position: 'fixed',
		backgroundColor: '#00c43e'
	},
	root: {
		width: '100%',
		marginTop: '10px',
		marginBottom: '3%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		textAlign: 'left'
	},
	image: {
		margin: '40px 0 10px 0'
	},
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
							<ListItemText style={{ fontSize: '24px' }} inset primary="Help" />
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
								Help
							</Typography>
						</Toolbar>
					</AppBar>
					<div style={{ backgroundColor: '#e7e7e7', }} >
						<div style={{ textAlign: 'center', marginTop: '45px', }}>
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
										What is Moretrash?
								</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										Moretrash is a pilot company engaged in online waste
										transportation services based on Progressive Web Application
										which provides convenience for customers and focuses on
										the utilization of these technologies to be implemented
										maximally.
								</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										How to use Moretrash services?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										Customers only need to open the Browser on their smartphone,
										then go to the Moretrash website. Customers can directly
										book garbage pick up, which then customers will fill in
										their personal data, time and pickup address.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										What features are on Moretrash?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										In Moretrash there are 4 features that can be enjoyed by all
										customers, namely Trash Sale (transportation of recycled
										waste). Trash Bag (transporting household waste), More
										Point (Customer loyalty card), More Pay (customers can
										pay anything).
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										What kind of garbage that can be picked up by Moretrash?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										Waste that can be picked up by Moretrash partners is
										in the form of paper waste, plastic bottles and some
										other heavy metal objects.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										How do I know the price of each type of garbage that will be picked up?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										To find out the price of garbage for each item, you only need
										to make a trash booking first.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										How Moretrash weigh the garbage?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										The garbage that will be transported by the Moretrash partner
										is weighed using a digital scale that is real accurate and
										cannot be manipulated.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										What is a Drop Point?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										If the customer wants to get a higher price, then the customer
										just simply comes and brings the garbage to the partner site
										that has already collaborated with Moretrash.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										What benefits do I get when using Moretrash services?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										Customers do not need to be bothered and difficult if they
										want to dispose of their trash, just book Moretrash.
										Garbage is immediately picked up.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										What is the procedure if there is a cancel order because
										picker or the customer does not make a pickup?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										If there is a cancel order or a failed pickup,
										the customer only needs to re-order.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>
										What are the benefits if you log in with an account on Moretrash?
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										Many benefits are obtained by customers when creating an
										Account on Moretrash, in addition to speeding up steps
										or the process of filling out the form, customers will
										also get points every time a pickup is made by the
										Moretrash partner.
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</div>
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
