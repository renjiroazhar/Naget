import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
// import LocationSearchInput from './AutoCompletePlaces/LocationSearchInput';

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
		area: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.props.nextStep();
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
								defaultValue={values.name}
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
								value={values.email}
								autoComplete="fname"
								onChange={handleChange('email')}
								defaultValue={values.email}
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
								value={values.phone}
								onChange={handleChange('phone')}
								defaultValue={values.phone}
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
							<TextField
								required
								label="Address"
								value={values.address}
								fullWidth
								autoComplete="billing address-line1"
								onChange={handleChange('address')}
								defaultValue={values.address}
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
							value={values.catatan}
							fullWidth
							autoComplete="billing address-line1"
							onChange={handleChange('catatan')}
							defaultValue={values.catatan}
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
