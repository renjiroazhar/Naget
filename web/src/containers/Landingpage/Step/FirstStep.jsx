import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import LocationSearchInput from './AutoCompletePlaces/LocationSearchInput';

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
		console.log(this.state);

		this.props.nextStep();
	};

	render() {
		const { classes } = this.props;
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<TextField
							required
							label="Nama"
							fullWidth
							autoComplete="fname"
							onChange={handleChange('name')}
							defaultValue={values.name}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							type="email"
							label="Email"
							fullWidth
							autoComplete="fname"
							onChange={handleChange('email')}
							defaultValue={values.email}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							label="Nomor WhatsApp"
							fullWidth
							autoComplete="fname"
							onChange={handleChange('phone')}
							defaultValue={values.phone}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							label="Alamat"
							fullWidth
							autoComplete="billing address-line1"
							onChange={handleChange('address')}
							defaultValue={values.address}
						/>
					</Grid>
					<Grid item xs={12}>
						<LocationSearchInput />
						<br />
						<br />
						<br />
					</Grid>

					<Grid item xs={12}>
						<div style={{ textAlign: 'center' }}>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
							>
								LOKASI TERKINI
								<AddIcon className={classes.rightIcon} />
							</Button>
						</div>
					</Grid>

					<Grid item xs={12}>
						<div
							style={{
								textAlign: 'right',
								justifyContent: 'right',
								float: 'right',
								marginTop: '10%'
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
	console.log(state);
	return {
		order: state.order.orders
	};
};

export default connect(mapStateToProps)(withStyles(styles)(FirstStep));
