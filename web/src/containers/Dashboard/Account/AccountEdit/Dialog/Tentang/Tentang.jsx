import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InfoIcon from '@material-ui/icons/Info';
import Add from '@material-ui/icons/Add';
import Header from './Header';
import Socmed from './Socmed/Socmed';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	text: {
		paddingTop: theme.spacing.unit * 2,
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2
	},
	demo: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		borderRadius: 0,
		paddingBottom: 0,
		borderBottom: '1px solid #999999',
		justifyContent: 'center'
	},
	title: {
		margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
	},
	paper: {
		paddingBottom: 50
	},
	list: {
		marginBottom: 0
	},
	subHeader: {
		backgroundColor: theme.palette.background.paper
	},
	appBar: {
		top: 'auto',
		bottom: 0
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Tentang extends React.Component {
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
			<div style={{ backgroundColor: 'white', marginBottom: '10%' }}>
				<List onClick={this.handleClickOpen} className={classes.list}>
					<ListItem button onClick={this.handleClickOpen}>
						<ListItemIcon>
							<InfoIcon style={{ fontSize: '24px' }} />
						</ListItemIcon>
						<ListItemSecondaryAction>
							<ListItemText
								style={{ fontSize: '24px' }}
								inset
								primary="About us"
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<div>
						<Header />
						<div style={{ marginTop: '140px' }}>
							<Socmed />
						</div>

						{/* Second Card */}
						<div style={{ marginTop: '58px' }}>
							<center>
								<div
									className={classes.demo}
									style={{ borderTop: '1px solid #999999' }}
								>
									<List>
										<ListItem>
											<ListItemText primary="Rate GMB" />
											<ListItemSecondaryAction>
												<IconButton aria-label="Add">
													<Add style={{ fontSize: '40px', color: '#00c43e' }} />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</List>
								</div>
							</center>
							{/* End Of Second Card */}

							{/* Third Card */}
							<center>
								<div
									className={classes.demo}
									style={{ borderBottom: '1px solid #999999' }}
								>
									<List>
										<ListItem>
											<ListItemText primary="Rate GMB" />
											<ListItemSecondaryAction>
												<IconButton aria-label="Add">
													<Add style={{ fontSize: '40px', color: '#00c43e' }} />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</List>
								</div>
							</center>
							{/* End Of Third Card */}
							<div style={{ margin: '20px', marginBottom: 0 }}>
								<p
									style={{
										textAlign: 'justify',
										fontWeight: 'lighter',
										color: '#353740',
										fontSize: '#353740'
									}}
								>
									Moretrash is a service that helps sales of recyclable garbage
									and household garbage (trash management platform on line)
								</p>
								<br />
								<br />
								<br />
								<br />
							</div>

							<div
								style={{
									textAlign: 'center',
									bottom: 10,
									position: 'fixed',
									width: '100%'
								}}
							>
								<Button
									varian="contained"
									style={{
										height: '40px',
										backgroundColor: '#00c43e',
										width: '90%',
										textAlign: 'center',
										color: '#ffffff'
									}}
									onClick={this.handleClose}
								>
									Back
								</Button>
							</div>
						</div>
					</div>
				</Dialog>
			</div>
		);
	}
}

Tentang.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tentang);
