import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import Button from '@material-ui/core/Button';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import { Icon } from 'react-onsenui';

export class Confirm extends Component {
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

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};
	backPage = () => {
		this.props.popPage();
		this.props.changeVisibilityTrue();
	};

	uploadingImage = () => {
		this.props.isLoading();
		this.props.handleUpload();
	};
	render() {
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
						<RaisedButton
							label="Upload Gambar"
							primary={true}
							style={styles.button}
							onClick={this.uploadingImage}
						/>
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
					<RaisedButton
						label="Back"
						disabled
						primary={false}
						style={{ margin: 15, float: 'left' }}
					/>
				);
			} else {
				return (
					<RaisedButton
						label="Back"
						primary={false}
						style={{ margin: 15, float: 'left' }}
						onClick={this.back}
					/>
				);
			}
		};
		const buttonSubmit = () => {
			if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
				return (
					<Button
						style={{
							margin: 15,
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
							margin: 15,
							float: 'right',
							backgroundColor: 'lime',
							color: 'white'
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
							margin: 15,
							float: 'right',
							backgroundColor: 'red',
							color: 'white'
						}}
					>
						Disabled
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
					<Icon size={35} spin={true} icon="ion-load-d" />
					<br />
					Mengupload Gambar...
				</div>
			);
		}

		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar style={styles.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.backPage}
								aria-label="Close"
							>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" style={{ flex: 1 }}>
								Konfirmasi
							</Typography>
						</Toolbar>
					</AppBar>
					<List>
						<ListItem primaryText="Nama Lengkap" secondaryText={name} />
						<ListItem primaryText="Nomor Telepon" secondaryText={phone} />
						<ListItem primaryText="Email" secondaryText={email} />
						<ListItem primaryText="Alamat" secondaryText={address} />
						<ListItem
							primaryText="Jam"
							secondaryText={moment(time).format('HH:MM')}
						/>
						<ListItem primaryText="Tanggal" secondaryText={address} />
						<ListItem primaryText="Foto : " />
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
														width="250"
														height="250"
														style={{ display: 'block', margin: '20px' }}
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
					<div>
						{buttonBack()}
						{buttonSubmit()}
					</div>
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	button: {
		margin: 15
	},
	appBar: {
		height: '56px',
		position: 'relative',
		backgroundColor: '#333c4e'
	},
	flex: 1
};

export default Confirm;
