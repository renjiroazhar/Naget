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
		visible: false
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
				allowSend,
				downloadURLs,
				loading
			}
		} = this.props;

		const uploadImage = () => {
			if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
				return null;
			}
			if (!allowSend) {
				return (
					<div style={{ textAlign: 'center' }}>
						<Button
							style={{
								backgroundColor: 'blue',
								color: 'white',
								marginBottom: '25px'
							}}
							onClick={this.uploadingImage}
						>
							Kirim Gambar
						</Button>
					</div>
				);
			} else {
				return (
					<div style={{ textAlign: 'center' }}>
						<p>Berhasil Mengupload Gambar</p>
					</div>
				);
			}
		};

		const buttonBack = () => {
			if (allowSend) {
				return (
					<div
						style={{
							textAlign: 'center',

							width: '100%'
						}}
					>
						<Button
							variant="contained"
							color="primary"
							disabled
							style={{
								width: '100%',
								backgroundColor: 'grey',
								color: 'white',
								height: '46px'
							}}
						>
							Kembali
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
						<Button
							variant="contained"
							color="primary"
							onClick={this.back}
							style={{
								width: '100%',
								backgroundColor: 'red',
								color: 'white',
								height: '46px'
							}}
						>
							Kembali
						</Button>
					</div>
				);
			}
		};
		const buttonSubmit = () => {
			if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
				return (
					<div
						style={{
							textAlign: 'center',

							width: '100%'
						}}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={this.props.handleCreateOrder}
							style={{
								width: '100%',
								backgroundColor: '#1ABC9C',
								color: 'white',
								height: '46px'
							}}
						>
							Selanjutnya
						</Button>
					</div>
				);
			}
			if (allowSend) {
				return (
					<div
						style={{
							textAlign: 'center',

							width: '100%'
						}}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={this.props.handleCreateOrder}
							style={{
								width: '100%',
								backgroundColor: '#1ABC9C',
								color: 'white',
								height: '46px'
							}}
						>
							Selanjutnya
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
						<Button
							variant="contained"
							color="primary"
							style={{
								width: '100%',
								backgroundColor: 'grey',
								color: 'white',
								height: '46px'
							}}
							disabled
						>
							Selanjutnya
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
					Mengupload Gambar...
				</div>
			);
		}

		return (
			console.log(selectedDate),
			(
				<React.Fragment>
					<Typography variant="h6" gutterBottom>
						Order summary
					</Typography>
					<List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Nama Lengkap"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={name} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Alamat" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={address} />
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
								<ListItemText
									style={{ float: 'left' }}
									secondary="Nomor Telepon"
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
									secondary="Tanggal Penjemputan"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText
									style={{ float: 'left' }}
									primary={`${format(selectedDate, 'dd/MM/yyyy')}`}
								/>
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Jam Penjemputan"
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
								<ListItemText style={{ float: 'left' }} secondary="Catatan" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={catatan} />
							</ListItem>
						</List>
						<ListItem primary="Foto : " />
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
															width="200"
															height="200"
															style={{ display: 'block' }}
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

					<br />
					<div style={{ textAlign: 'center' }}>{uploadImage()}</div>

					<br />
					<br />
					<br />

					<div style={{ marginBottom: '25px' }}>
						<Grid item xs={12}>
							{buttonBack()}
						</Grid>

						<br />
						<Grid item xs={12}>
							{buttonSubmit()}
						</Grid>
					</div>
					<br />
					<br />
					<br />
				</React.Fragment>
			)
		);
	}
}

Review.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
