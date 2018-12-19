import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import TimeInput from 'material-ui-time-picker';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
export class FormPersonalDetails extends Component {
	continue = e => {
		const { values } = this.props;

		e.preventDefault();
		if (
			values.previewGeneralPhotos.length < 0 ||
			values.previewGeneralPhotos === [] ||
			values.previewGeneralPhotos === null
		) {
			this.props.allowSend();
		}
		this.props.nextStep();
	};
	state = {
		files: [],
		previewGeneralPhotos: [],
		generalPhotos: [],
		time: '',
		visible: false
	};

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
		this.props.history.push('/');
	};

	deleteImage = params => {
		const { generalPhotos } = this.state;
		generalPhotos.splice(params, 1);
		this.setState({
			generalPhotos
		});
	};
	onDropGeneral = currentGeneralPhoto => {
		let index;
		for (index = 0; index < currentGeneralPhoto.length; ++index) {
			const file = currentGeneralPhoto[index];
			this.setState(({ previewGeneralPhotos }) => ({
				previewGeneralPhotos: previewGeneralPhotos.concat(file)
			}));
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = event => {
				this.setState({
					generalPhotos: this.state.generalPhotos.concat([
						{ base64: event.target.result }
					])
				});
			};
		}
	};

	componentWillUnmount() {
		this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
	}

	render() {
		const { values, handleChange } = this.props;

		return (
			<MuiThemeProvider>
				<React.Fragment>
					<div style={{ height: '100%', minHeight: '100vh' }}>
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
									Enter Personal Details
								</Typography>
							</Toolbar>
						</AppBar>

						{/* <TextField
						hintText="Enter Your Occupation"
						floatingLabelText="Occupation"
						onChange={handleChange('occupation')}
						defaultValue={values.occupation}
						style={styles.textArea}
					/> */}
						<br />
						<TimeInput
							mode="24h"
							onChange={time => this.props.handleChangeTime(time)}
							style={styles.textArea}
							autoOk
						/>
						<br />
						<TextField
							hintText="Enter Your City"
							floatingLabelText="City"
							onChange={handleChange('city')}
							defaultValue={values.city}
							style={styles.textArea}
						/>
						<br />
						<TextField
							hintText="Enter Your Bio"
							floatingLabelText="Bio"
							onChange={handleChange('bio')}
							defaultValue={values.bio}
							style={styles.textArea}
						/>
						<br />
						<div>
							<section>
								<Dropzone
									accept="image/*"
									multiple={true}
									style={dropzoneStyle}
									onDrop={this.props.onDropGeneral.bind(this)}
								>
									{({ getRootProps, getInputProps }) => (
										<div {...getRootProps()} style={{ textAlign: 'center' }}>
											<RaisedButton
												label="Masukkan Foto"
												primary={true}
												style={styles.button}
											>
												<input {...getInputProps()} />
											</RaisedButton>
										</div>
									)}
								</Dropzone>

								{values.previewGeneralPhotos.length > 0 ? (
									<div>
										<div>
											{values.previewGeneralPhotos.map((file, i) => (
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

													<Fab
														size="small"
														color="secondary"
														aria-label="Add"
														onClick={() => this.props.deleteImage(i)}
														style={{ backgroundColor: 'red' }}
													>
														<CloseIcon />
													</Fab>
												</div>
											))}
										</div>
									</div>
								) : null}
							</section>
						</div>
						{/* <div style={{ textAlign: 'center' }}>
						<RaisedButton
							label="Upload"
							primary={true}
							style={styles.button}
							onClick={this.props.handleUpload.bind(this)}
						/>
					</div> */}
						{/* <ul>{files}</ul> */}
						{/* <p>Progress: {`${this.state.uploadProgress} %`}</p> */}
						<br />
						<div>
							<RaisedButton
								label="Back"
								primary={false}
								style={{ margin: 15, float: 'left' }}
								onClick={this.back}
							/>
							<Button
								style={{
									margin: 15,
									float: 'right',
									backgroundColor: 'lime',
									color: 'white'
								}}
								onClick={this.continue}
							>
								continue
							</Button>
						</div>
					</div>
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	button: {
		margin: 15,
		backgroundColor: 'red'
	},
	appBar: {
		height: '56px',
		position: 'relative',
		backgroundColor: '#333c4e'
	},
	textArea: {
		marginRight: 15,
		marginLeft: 15,
		width: '90%'
	}
};

const dropzoneStyle = {
	width: '100%',
	height: '20%',
	border: '1px solid black'
};

export default withRouter(FormPersonalDetails);
