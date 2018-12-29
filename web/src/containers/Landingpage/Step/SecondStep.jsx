import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Dropzone from 'react-dropzone';
import Viewer from 'react-viewer';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { Icon, IconButton } from '@material-ui/core';
import {
	DatePicker,
	MuiPickersUtilsProvider,
	TimePicker
} from 'material-ui-pickers';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
	root: {
		width: '100%',

		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	button: {
		backgroundColor: '#1ABC9C',
		height: '46px',
		'&:hover': {
			backgroundColor: '#1ABC9C',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#1ABC9C',
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
		this.props.setSecondStepItem();
		this.props.handleNextStepTwo();
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
		const { classes, values, handleDateChange } = this.props;
		const officeHours = [
			{ from: '9:00', to: '12:00' },
			{ from: '13:00', to: '17:00' }
		];
		const today = new Date();
		return (
			<React.Fragment>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<MuiPickersUtilsProvider
							utils={DateFnsUtils}
							locale={values.locale}
						>
							<div className="picker">
								<FormControl style={{ width: '100%' }}>
									<DatePicker
										minDate={today}
										style={{ width: '100%' }}
										value={values.selectedDate}
										onChange={handleDateChange}
										label="Pickup Date"
										required
										placeholder="Choose Date"
										InputProps={{
											startAdornment: (
												<div>
													<IconButton
														aria-label="Select locale"
														aria-owns={values.anchorEl ? 'locale-menu' : null}
													>
														<Icon> date_range </Icon>
													</IconButton>
												</div>
											)
										}}
									/>
									{values.errorsDate ? (
										<FormHelperText style={{ color: 'red' }}>
											Required
										</FormHelperText>
									) : (
										''
									)}
								</FormControl>
							</div>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12}>
						<MuiPickersUtilsProvider
							utils={DateFnsUtils}
							locale={values.locale}
						>
							<div className="picker">
								<FormControl style={{ width: '100%' }}>
									<TimePicker
										style={{ width: '100%' }}
										value={values.selectedDate}
										allowedTimes={officeHours}
										onChange={handleDateChange}
										label="Pickup Time"
										placeholder="Choose Time"
										required
										ampm={false}
										InputProps={{
											startAdornment: (
												<div>
													<IconButton
														aria-label="Select locale"
														aria-owns={values.anchorEl ? 'locale-menu' : null}
													>
														<Icon> schedule </Icon>
													</IconButton>
												</div>
											)
										}}
									/>
									{values.errorsDate ? (
										<FormHelperText style={{ color: 'red' }}>
											Required
										</FormHelperText>
									) : (
										''
									)}
								</FormControl>
							</div>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12}>
						{values.previewGeneralPhotos.length > 0 ? (
							<div>
								<div>
									{values.previewGeneralPhotos &&
										values.previewGeneralPhotos.map((file, i) => (
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
					</Grid>
					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',
								height: '140px',
								border: '1.5px dashed #757575',
								backgroundColor: '#E5E5E5',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
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
												style={{
													backgroundColor: '#B0B0B0',
													color: 'white',
													height: '40px',
													borderRadius: '100px'
												}}
												color="primary"
											>
												Input Photo
											</Button>
										</div>
									)}
								</Dropzone>
							</section>
						</div>
					</Grid>
					{/* <Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',

								width: '100%',
								marginTop: '10%'
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleBack}
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
					</Grid> */}
					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',
								marginTop: '10%',
								width: '100%'
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleSubmit}
								className={classes.button}
								style={{
									width: '100%',
									backgroundColor: '#1ABC9C',
									color: 'white'
								}}
							>
								Next
							</Button>
						</div>
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
