import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
		backgroundColor: '#fecb00ff',
		height: '46px',
		'&:hover': {
			backgroundColor: '#fecb00ff',
			borderColor: '#0062cc',
			color: 'white'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#fecb00ff',
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

class SecondStep extends React.Component {
	state = {
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
								onChange={handleChange('username')}
								value={values.username}
								disabled
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
								disabled
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
								label="Address"
								fullWidth
								autoComplete="billing address-line1"
								onChange={handleChange('address')}
								value={values.address}
								disabled
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
						<FormControl className={classes.formControl}>
							<TextField
								required
								type="number"
								label="WhatsApp Number"
								fullWidth
								autoComplete="fname"
								onChange={handleChange('phone')}
								value={values.phone}
								disabled
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
							<InputLabel htmlFor="age-label-placeholder">Variant</InputLabel>
							<Select
								open={this.state.openTwo}
								onClose={this.handleCloseTwo}
								onOpen={this.handleOpenTwo}
								value={values.variant}
								onChange={handleChange('variant')}
								style={{ width: '100%' }}
							>
								<MenuItem value="" disabled>
									<em>- Choose variant -</em>
								</MenuItem>
								<MenuItem value="Original Banana Nugget">Original Banana Nugget</MenuItem>
								<MenuItem value="Chocolate Banana Nugget">Chocolate Banana Nugget</MenuItem>
								<MenuItem value="Cheese Banana Nugget">Cheese Banana Nugget</MenuItem>
								<MenuItem value="Special Banana Nugget">Special Banana Nugget</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Count"
							fullWidth
							type="number"
							autoComplete="billing address-line1"
							onChange={handleChange('count')}
							value={values.count}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							label="Driver Note (Optional)"
							fullWidth
							autoComplete="billing address-line1"
							onChange={handleChange('description')}
							value={values.description}
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

SecondStep.propTypes = {
	classes: PropTypes.object.isRequired
};

export default (withStyles(styles)(SecondStep));
