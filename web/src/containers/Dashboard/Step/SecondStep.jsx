import React from 'react';
import Button from '@material-ui/core/Button';
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
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Dropzone from 'react-dropzone';
import Viewer from 'react-viewer';

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

class SecondStep extends React.Component {
	state = {
		time: '',
		filenames: [],
		downloadURLs: [],
		isUploading: false,
		uploadProgress: 0,
		visible: false
	};

	handleSubmit = e => {
		e.preventDefault();
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
	handleChange = value => {
		this.setState({
			time: value
		});
	};

	handleBack = () => {
		this.props.previousStep();
	};

	componentWillUnmount() {
		this.props.values.previewGeneralPhotos.forEach(file =>
			URL.revokeObjectURL(file.preview)
		);
	}

	render() {
		const { secondary, time } = this.state;
		const { classes, values } = this.props;

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
						<div style={{ textAlign: 'center' }}>
							<section>
								<Dropzone
									accept="image/*"
									multiple={true}
									style={dropzoneStyle}
									onDrop={this.props.onDropGeneral.bind(this)}
								>
									{({ getRootProps, getInputProps }) => (
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<Button
												component="span"
												style={{ backgroundColor: 'blue', color: 'white' }}
												color="primary"
											>
												Masukkan Gambar
											</Button>
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
																width="200"
																height="200"
																style={{ display: 'block', marginTop: '20px' }}
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
					</Grid>
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item xs={12} sm={12}>
							<div style={{ marginTop: '15%' }}>
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
										Back
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
										Next
									</Button>
								</div>
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

const dropzoneStyle = {
	width: '100%',
	height: '20%',
	border: '1px solid black'
};

export default connect(
	null,
	null
)(withStyles(styles)(SecondStep));
