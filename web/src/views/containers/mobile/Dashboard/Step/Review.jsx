import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import 'moment/locale/id';

const styles = theme => ({
	listItem: {
		padding: `${theme.spacing.unit}px 0`
	},
	total: {
		fontWeight: '700'
	},
	title: {
		marginTop: theme.spacing.unit * 2
	},
	list: {
		padding: 0
	},
	list2: {
		padding: 6
	}
});

class Review extends React.Component {
	state = {
		visible: false,
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	isLoading = () => {
		this.props.isLoading();
	};

	async continue(e) {
		e.preventDefault();

		await this.props.nextStep();
	};

	back = () => {
		this.props.previousStep();
	};

	render() {
		const { classes } = this.props;
		const {
			values: {
				username,
				phone,
				email,
				address,
				variant,
				count,
				description
			}
		} = this.props;
		let productPrice =
			variant === "Original Banana Nugget" ? 15000 :
				variant === "Chocolate Banana Nugget" ? 16000 :
					variant === "Cheese Banana Nugget" ? 17000 :
						variant === "Special Banana Nugget" ? 18000 : 0
		let totalPrice = productPrice * count;
		console.log(totalPrice)

		return (
			(
				<React.Fragment>
					<Typography variant="title" gutterBottom>
						Order Summary
					</Typography>
					<List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Name"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={username} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Email" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={email} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Address" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={address} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Phone Number"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={phone} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Price" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={productPrice} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Total" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={totalPrice} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Driver Note" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={description} />
							</ListItem>
						</List>
					</List>

					{/* <div style={{ textAlign: 'center' }}>{uploadImage()}</div> */}

					<div style={{ marginTop: '10%', }}>
						<Grid item xs={12}>
							<div
								style={{
									textAlign: 'center',

									width: '100%'
								}}
							>
								<Button varian="contained"
									variant="contained"
									color="primary"
									onClick={this.props.handleCreateOrder}
									style={{
										width: '100%',
										backgroundColor: '#fecb00ff',
										color: 'white',
										height: '46px'
									}}
								>
									Order
						</Button>
							</div>
						</Grid>
					</div>
				</React.Fragment>
			)
		);
	}
}

Review.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
