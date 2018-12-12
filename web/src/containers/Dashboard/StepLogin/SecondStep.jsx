import React from 'react';
import Button from '@material-ui/core/Button';
import Camera from 'react-camera';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TimeInput from 'material-ui-time-picker';
import { connect } from 'react-redux';
import FileUploader from 'react-firebase-file-uploader';
import firebase from '../../../services/firebaseConfig';

const styles = theme => ({
	root: {
		width: '100%',

		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	button: {
		margin: theme.spacing.unit,
		backgroundColor: '#00c43e',
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#0062cc',
			borderColor: '#005cbf'
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
		}
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	}
});

const style = {
	preview: {
		position: 'relative'
	},
	captureContainer: {
		display: 'flex',
		position: 'absolute',
		justifyContent: 'center',
		zIndex: 1,
		bottom: 0,
		width: '100%'
	},
	captureButton: {
		backgroundColor: '#fff',
		borderRadius: '50%',
		height: 56,
		width: 56,
		color: '#000',
		margin: 20
	},
	captureImage: {
		width: '100%'
	}
};

class SecondStep extends React.Component {
	state = {
		time: '',
		filenames: [],
		downloadURLs: [],
		isUploading: false,
		uploadProgress: 0
	};

	constructor(props) {
		super(props);
		this.takePicture = this.takePicture.bind(this);
		this.basePath = 'images';
	}

	takePicture() {
		this.camera.capture().then(blob => {
			this.img.src = URL.createObjectURL(blob);
			this.img.onload = () => {
				URL.revokeObjectURL(this.src);
			};
		});
	}

	handleChange = value => {
		this.setState({
			time: value
		});
	};

	handleBack = () => {
		const { order, DeleteDataStep } = this.props;
		this.props.previousStep();
		DeleteDataStep(order.name, order.address, order.area, order.phone);
		console.log(order);
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
		this.props.saveData(this.state);
		this.props.nextStep();
	};

	handleUploadStart = () =>
		this.setState({
			isUploading: true,
			uploadProgress: 0
		});

	handleProgress = progress =>
		this.setState({
			uploadProgress: progress
		});

	handleUploadError = error => {
		this.setState({
			isUploading: false
			// Todo: handle error
		});
		console.error(error);
	};

	handleUploadSuccess = async filename => {
		const downloadURL = await firebase
			.storage()
			.ref('images')
			.child(filename)
			.getDownloadURL();

		this.setState(oldState => ({
			filenames: [...oldState.filenames, filename],
			downloadURLs: [...oldState.downloadURLs, downloadURL],
			uploadProgress: 100,
			isUploading: false
		}));
		console.log(this.state);
	};

	deleteImage = params => {
		const { downloadURLs } = this.state;
		downloadURLs.splice(params, 1);
		this.setState({
			downloadURLs
		});
	};

	// displayPicture = e => {
	// 	const files = e.target.files;

	// 	for (var i = 0; i < files.length; i++) {
	// 		var file = files[i];
	// 		//Only pics
	// 		if (!file.type.match("image")) continue;

	// 		var picReader = new FileReader();
	// 		picReader.addEventListener("load", e => {
	// 			var picFile = e.target;
	// 			this.setState({
	// 				pictureURLs: picReader.result,
	// 				pictures: picFile
	// 			});
	// 		});
	// 		//Read the image
	// 		picReader.readAsDataURL(file);
	// 	}

	// 	console.log(file);
	// };

	render() {
		const { secondary, time } = this.state;
		const { classes } = this.props;

		return (
			<React.Fragment>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<List>
							<ListItem>
								<ListItemText
									primary="Tanggal"
									secondary={secondary ? 'Secondary text' : null}
								/>
								<ListItemSecondaryAction>
									<IconButton aria-label="Add">
										<AddIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>

							<hr />
						</List>
					</Grid>
					<Grid item xs={12}>
						<List>
							<ListItem>
								<ListItemText
									primary="Jam"
									secondary={secondary ? 'Secondary text' : null}
								/>
								<TimeInput
									mode="24h"
									id="time"
									value={time}
									onChange={time => {
										this.handleChange(time);
										console.log(time);
									}}
								/>
							</ListItem>
							<hr />
						</List>
					</Grid>

					<Grid item xs={12}>
						<div>
							<div style={{ textAlign: 'center' }}>
								<label
									style={{
										backgroundColor: 'steelblue',
										color: 'white',
										padding: 10,
										borderRadius: 4,
										pointer: 'cursor'
									}}
								>
									Silakan Masukkan Gambar
									<FileUploader
										hidden
										accept="image/*"
										storageRef={firebase.storage().ref('images')}
										onUploadStart={this.handleUploadStart}
										onUploadError={this.handleUploadError}
										onUploadSuccess={this.handleUploadSuccess}
										onProgress={this.handleProgress}
									/>
								</label>

								<div style={style.container}>
									<Camera
										style={style.preview}
										ref={cam => {
											this.camera = cam;
										}}
									>
										<div
											style={style.captureContainer}
											onClick={this.takePicture}
										>
											<div
												style={style.captureButton}
												onClick={this.state.downloadURLs}
											/>
										</div>
									</Camera>
									<img
										style={style.captureImage}
										ref={img => {
											this.img = img;
										}}
										alt=""
									/>
								</div>

								<p>Progress: {`${this.state.uploadProgress} %`}</p>
							</div>
							<div>
								{this.state.downloadURLs.map((downloadURL, i) => {
									return (
										<div>
											{/* <button onClick={()=>{this.deleteImage(this.)}}>Hapus</button> */}
											<img
												key={i}
												alt=""
												style={{ padding: '15px' }}
												height="150px"
												width="150px"
												src={downloadURL}
											/>
											<div>
												<button onClick={() => this.deleteImage(i)}>
													Delete Image
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</Grid>
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item xs={12} sm={12}>
							<div>
								<Button
									style={{
										float: 'left',
										backgroundColor: 'red',
										color: 'white'
									}}
									onClick={this.handleBack}
									className={classes.button}
								>
									Kembali
								</Button>
							</div>

							<div
								style={{
									textAlign: 'right',
									justifyContent: 'right',
									float: 'right'
								}}
							>
								<Button
									variant="contained"
									color="primary"
									onClick={this.handleSubmit}
									className={classes.button}
									style={{ float: 'right' }}
								>
									Selanjutnya
								</Button>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

SecondStep.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	null,
	null
)(withStyles(styles)(SecondStep));
