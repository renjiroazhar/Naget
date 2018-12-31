import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { format } from 'date-fns/esm';
import moment from 'moment';
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
	}

	viewImage = () => {
		this.setState({
			visible: true
		});
	};
	cancelViewImage = () => {
		this.setState({
			visible: false
		});
	};
	back = () => {
		this.props.previousStep();
	};

	uploadingImage = () => {
		this.props.isLoading();
		this.handleClose();
		this.props.handleUpload();
	};

	render() {
		const { classes } = this.props;
		const {
			values: {
				name,
				phone,
				email,
				address,

				selectedDate,
				previewGeneralPhotos,

				catatan,

				downloadURLs,
				loading
			}
		} = this.props;

		// const uploadImage = () => {
		// 	if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
		// 		return null;
		// 	}
		// 	if (!allowSend) {
		// 		return (
		// 			<div style={{ textAlign: 'center' }}>
		// 				<Button varian="contained"
		// 					style={{
		// 						backgroundColor: '#00c43e',
		// 						color: 'white',
		// 						height: '40px',
		// 						marginBottom: '25px'
		// 					}}
		// 					onClick={this.handleClickOpen}
		// 				>
		// 					Kirim Gambar
		// 				</Button>
		// 			</div>
		// 		);
		// 	} else {
		// 		return (
		// 			<div style={{ textAlign: 'center' }}>
		// 				<p>Berhasil Mengupload Gambar</p>
		// 			</div>
		// 		);
		// 	}
		// };

		const buttonSubmit = () => {
			if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
				return (
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
								backgroundColor: '#00c43e',
								color: 'white',
								height: '46px'
							}}
						>
							Order
						</Button>
					</div>
				);
			} else {
				return (
					<div
						style={{
							textAlign: 'center',

							width: '100%'
						}}
					>
						<Button varian="contained"
							variant="contained"
							color="primary"
							style={{
								width: '100%',
								backgroundColor: '#00c43e',
								color: 'white',
								height: '46px'
							}}
							onClick={this.props.handleUpload}
						>
							Order
						</Button>
					</div>
				);
			}
		};

		if (loading) {
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
					<br />
					Uploading Photo...
				</div>
			);
		}

		return (
			console.log(selectedDate),
			(
				<React.Fragment>
					<Typography variant="h6" gutterBottom>
						Order Summary
					</Typography>
					<List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Name" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={name} />
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
								<ListItemText
									style={{ float: 'left' }}
									secondary="Pickup Date"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText
									style={{ float: 'left' }}
									primary={`${moment(selectedDate)
										.lang('id')
										.format('LL')}`}
								/>
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Pickup Time"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText
									style={{ float: 'left' }}
									primary={`${format(selectedDate, 'HH:mm')}`}
								/>
							</ListItem>
						</List>

						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Driver Note"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={catatan} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Garbage Photos"
								/>
							</ListItem>

							{previewGeneralPhotos.length > 0 ? (
								<div>
									<div>
										{previewGeneralPhotos &&
											previewGeneralPhotos.map((file, i) => (
												<div style={{ textAlign: 'center' }}>
													<Grid container spacing={24}>
														<Grid item xs={12} align="center">
															{' '}
															<img
																onClick={this.viewImage}
																src={URL.createObjectURL(file)}
																alt="preview failed"
																key={file.base64}
																height="175"
																style={{
																	width: '100%',
																	marginTop: '20px',

																	objectFit: 'contain'
																}}
															/>
														</Grid>
													</Grid>

													<Viewer
														visible={this.state.visible}
														onClose={this.cancelViewImage}
														images={[
															{
																src: URL.createObjectURL(file),
																alt: ''
															}
														]}
													/>
												</div>
											))}
									</div>
								</div>
							) : null}
						</List>
					</List>

					{/* <div style={{ textAlign: 'center' }}>{uploadImage()}</div> */}

					<div style={{ marginTop: '10%' }}>
						<Grid item xs={12}>
							{buttonSubmit()}
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
