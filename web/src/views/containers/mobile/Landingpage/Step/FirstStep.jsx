import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  banyumanik,
  candisari,
  gajahmungkur,
  gayamsari,
  genuk,
  gunungpati,
  mijen,
  ngaliyan,
  pedurungan,
  semarang_barat,
  semarang_selatan,
  semarang_tengah,
  semarang_timur,
  semarang_utara,
  tembalang,
  tugu
} from '../../../../../variables/Area';

const styles = theme => ({
	root: {
		width: '100%',

		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	button: {
		backgroundColor: '#00c43e',
		height: '46px',
		'&:hover': {
			backgroundColor: '#00c43e',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#00c43e',
			borderColor: '#005cbf'
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
		}
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	formControl: {
		width: '100%'
	}
});

class FirstStep extends React.Component {
	state = {
		name: '',
		phone: '',
		address: '',
		area: '',
		open: false,
		openTwo: false
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	handleOpen = () => {
		this.setState({
			open: true
		});
	};

	handleCloseTwo = () => {
		this.setState({
			openTwo: false
		});
	};

	handleOpenTwo = () => {
		this.setState({
			openTwo: true
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.nextStep();
		console.log('FIRST');
	};

	render() {
		const { classes } = this.props;
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<TextField
								required
								label="Name"
								fullWidth
								autoComplete="fname"
								onChange={handleChange('name')}
								value={values.name}
									/>
							{values.errorAll ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : values.errorsName ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : null}
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<TextField
								required
								type="email"
								label="Email"
								fullWidth
								autoComplete="fname"
								onChange={handleChange('email')}
								value={values.email}
									/>
							{values.errorAll ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : values.errorsEmail ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : values.errorsTitikEmail ? (
								<FormHelperText style={{ color: 'red' }}>
									Email must have at least 1 dot
								</FormHelperText>
							) : values.errorsAtEmail ? (
								<FormHelperText style={{ color: 'red' }}>
									Email must have @gmail
								</FormHelperText>
							) : null}
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<TextField
								required
								type="number"
								label="WhatsApp Number"
								fullWidth
								autoComplete="fname"
								onChange={handleChange('phone')}
								value={values.phone}
									/>
							{values.errorAll ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : values.errorsPhone ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : null}
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="age-label-placeholder">Kecamatan</InputLabel>
							<Select
								open={this.state.open}
								onClose={this.handleClose}
								onOpen={this.handleOpen}
								value={values.kecamatan}
								defaultChecked={values.kecamatan}
								onChange={handleChange('kecamatan')}
								style={{ width: '100%' }}
							>
								<MenuItem disabled value="">
									<em>- Pilih Kecamatan -</em>
								</MenuItem>

								<MenuItem value="Semarang Tengah">Semarang Tengah</MenuItem>
								<MenuItem value="Semarang Utara">Semarang Utara</MenuItem>
								<MenuItem value="Semarang Timur">Semarang Timur</MenuItem>
								<MenuItem value="Semarang Selatan">Semarang Selatan</MenuItem>
								<MenuItem value="Semarang Barat">Semarang Barat</MenuItem>
								<MenuItem value="Gayamsari">Gayamsari</MenuItem>
								<MenuItem value="Genuk">Genuk</MenuItem>
								<MenuItem value="Candisari">Candisari</MenuItem>
								<MenuItem value="Gajahmungkur">Gajahmungkur</MenuItem>
								<MenuItem value="Tembalang">Tembalang</MenuItem>
								<MenuItem value="Banyumanik">Banyumanik</MenuItem>
								<MenuItem value="Gunungpati">Gunungpati</MenuItem>
								<MenuItem value="Mijen">Mijen</MenuItem>
								<MenuItem value="Ngaliyan">Ngaliyan</MenuItem>
								<MenuItem value="Tugu">Tugu</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="age-label-placeholder">Kelurahan</InputLabel>
							<Select
								open={this.state.openTwo}
								onClose={this.handleCloseTwo}
								onOpen={this.handleOpenTwo}
								value={values.kelurahan}
								defaultChecked={values.kelurahan}
								onChange={handleChange('kelurahan')}
								style={{ width: '100%' }}
							>
								<MenuItem value="" disabled>
									<em>- Pilih Kelurahan -</em>
								</MenuItem>
								<MenuItem value="Gudang">Gudang</MenuItem>
								<MenuItem value="Gudang Ikan">Gudang Ikan</MenuItem>
								<MenuItem value="Kebersihan">Kebersihan</MenuItem>
								<MenuItem value="Outbound">Outbound</MenuItem>
								<MenuItem value="Pertamanan">Pertamanan</MenuItem>
								<MenuItem value="Rekreasi">Rekreasi</MenuItem>
								<MenuItem value="Restoran">Restoran</MenuItem>
								<MenuItem value="Technical Support">Technical Support</MenuItem>
								<MenuItem value="Security">Security</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<TextField
								required
								label="Address"
								fullWidth
								autoComplete="billing address-line1"
								onChange={handleChange('address')}
								value={values.address}
									/>
							{values.errorAll ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : values.errorsAddress ? (
								<FormHelperText style={{ color: 'red' }}>
									Required
								</FormHelperText>
							) : null}
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Driver Note (Optional)"
							fullWidth
							autoComplete="billing address-line1"
							onChange={handleChange('catatan')}
							value={values.catatan}
						/>
					</Grid>

					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'center',
								justifyContent: 'center',
								width: '100%',
								marginTop: '10%'
							}}
						>
							<Button
								varian="contained"
								variant="contained"
								color="primary"
								onClick={this.handleSubmit}
								className={classes.button}
								style={{ width: '100%' }}
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

FirstStep.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		order: state.order.orders
	};
};

export default connect(mapStateToProps)(withStyles(styles)(FirstStep));
