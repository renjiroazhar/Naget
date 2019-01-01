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
import red from '@material-ui/core/colors/red';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import CarouselTestimoni from './Carousel';
import PaperSheet from './PaperSheet';

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%'
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
		color: '#00c43e',
		textAlign: 'center',
		marginBottom: '13%',
	},
	card: {
		maxWidth: 400,
		textAlign: 'center'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		}),
		marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
			marginRight: -8
		}
	},
	flex: {
		textAlign: 'center'
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	},
	appBar: {
		position: 'fixed',
		backgroundColor: '#00c43e'
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Testimoni extends React.Component {
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
							<ThumbUpIcon style={{ fontSize: '24px', color: 'lawngreen' }} />
						</ListItemIcon>
						<ListItemSecondaryAction>
							<ListItemText
								style={{ fontSize: '24px' }}
								inset
								primary="Testimonials"
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
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close"
							>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" color="inherit">
								Testimonials
							</Typography>
						</Toolbar>
					</AppBar>
					<div
						className={classes.root}
						style={{
							width: '100%',
							height: '100%',
							marginTop: '56px',
						}}
					>
						<PaperSheet />
						<Typography variant="h6" className={classes.title}>
							Testimonials
						</Typography>
						<center>
							<CarouselTestimoni />
						</center>
					</div>
				</Dialog>
			</div>
		);
	}
}

Testimoni.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Testimoni);
