import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import * as moment from 'moment';

const styles = theme => ({
	listItem: {
		padding: `${theme.spacing.unit}px 0`
	},
	total: {
		fontWeight: '700'
	},
	title: {
		marginTop: theme.spacing.unit * 2
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
		// const { classes } = this.props;
		const {
			values: {
				name,
				phone,
				email,
				address,
				previewGeneralPhotos,
				time,
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
					<Button
						style={{
							float: 'left',
							backgroundColor: 'grey',
							color: 'white',
							marginBottom: '15px'
						}}
						disabled
						onClick={this.back}
					>
						Back
					</Button>
				);
			} else {
				return (
					<Button
						style={{
							float: 'left',
							backgroundColor: 'red',
							color: 'white',
							marginBottom: '15px'
						}}
						onClick={this.back}
					>
						Back
					</Button>
				);
			}
		};
		const buttonSubmit = () => {
			if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
				return (
					<Button
						style={{
							float: 'right',
							backgroundColor: 'lime',
							color: 'white'
						}}
						onClick={this.props.handleCreateOrder}
					>
						Confirm
					</Button>
				);
			}
			if (allowSend) {
				return (
					<Button
						style={{
							float: 'right',
							backgroundColor: 'lime',
							color: 'white',
							marginBottom: '15px'
						}}
						onClick={this.props.handleCreateOrder}
					>
						Confirm
					</Button>
				);
			} else {
				return (
					<Button
						disabled
						style={{
							float: 'right',
							backgroundColor: 'grey',
							color: 'white',
							marginBottom: '15px'
						}}
					>
						Confirm
					</Button>
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
			console.log(this.props),
			(
				<React.Fragment>
					<Typography variant="h6" gutterBottom>
						Order summary
					</Typography>
					<List>
						<ListItem primary="Nama Lengkap" secondary={name} />
						<ListItem primary="Nomor Telepon" secondary={phone} />
						<ListItem primary="Email" secondary={email} />
						<ListItem primary="Alamat" secondary={address} />
						<ListItem primary="Jam" secondary={moment(time).format('HH:MM')} />
						<ListItem primary="Tanggal" secondary={address} />
						<ListItem primary="Foto : " />
						{previewGeneralPhotos.length > 0 ? (
							<div>
								<div>
									{previewGeneralPhotos.map((file, i) => (
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
						{buttonSubmit()}
						{buttonBack()}
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
