import React from 'react';
import { Toolbar, Page, BackButton, Icon } from 'react-onsenui';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import OrderContainer from '../OrderContainer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	list: {
		padding: 0
	},
	list2: {
		padding: 6
	}
});

class OrderDetail extends React.Component {
	state = {
		open: true
	};

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	pushPage() {
		this.props.navigator.pushPage({ component: OrderContainer });
	}

	popPage() {
		this.props.navigator.popPage();
	}

	renderToolbar() {
		return (
			<Toolbar
				transparent
				noshadow
				style={{ height: '56px', backgroundColor: '#333c4e' }}
			>
				<div className="left" style={{ lineHeight: '56px', color: 'white' }}>
					<BackButton onClick={this.popPage}>Back</BackButton>
					Detail
				</div>
			</Toolbar>
		);
	}

	render() {
		const { order, classes } = this.props;

		if (order) {
			return (
				console.log(order),
				(
					<Page renderToolbar={this.renderToolbar}>
						<div
							style={{
								height: '100%',
								minHeight: '100vh',
								backgroundColor: '#ffffff',
								width: '100%'
							}}
						>
							<List style={{ overflow: 'hidden' }}>
								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Nama Pengorder"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={order.logs.name}
										/>
									</ListItem>
								</List>
								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Alamat"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={order.location.alamat}
										/>
									</ListItem>
								</List>
								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Nomor Telepon"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={order.logs.phone}
										/>
									</ListItem>
								</List>

								<List className={classes.list} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Catatan"
										/>
									</ListItem>
									<ListItem style={{ paddingTop: 0 }}>
										<ListItemText
											style={{ float: 'left' }}
											primary={
												order.location.catatan ? order.location.catatan : null
											}
										/>
									</ListItem>
								</List>
								<List className={classes.list2} onClick={this.handleClickOpen}>
									<ListItem button onClick={this.handleClickOpen}>
										<ListItemText
											style={{ float: 'left' }}
											secondary="Foto :"
										/>
									</ListItem>
									<div>
										{order.foto.downloadURLs ? (
											<Grid container spacing={16}>
												<Grid item xs={12}>
													<Grid
														container
														className={classes.demo}
														justify="center"
														spacing={8}
													>
														<Grid item>
															<img
																key={order.foto.downloadURLs}
																src={order.foto.downloadURLs}
																width="100px"
																height="100px"
																alt=""
															/>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										) : (
											<div>a</div>
										)}
									</div>
								</List>
							</List>
						</div>
					</Page>
				)
			);
		} else {
			return (
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						height: '100%',
						position: 'relative',
						top: 'calc(50% - 10px)'
					}}
				>
					<Icon size={35} spin={true} icon="ion-load-d" />
					<br />
					Loading
				</div>
			);
		}
	}
}

OrderDetail.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.idItem;
	const orders = state.firestore.data.orders;
	const order = orders ? orders[id] : null;
	return {
		order: order
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'orders' }])
)(withStyles(styles)(OrderDetail));
