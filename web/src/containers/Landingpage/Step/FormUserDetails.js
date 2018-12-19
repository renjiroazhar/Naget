import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

export class FormUserDetails extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	backPage = () => {
		this.props.history.push('/');
	};

	render() {
		const { values, handleChange } = this.props;
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
								Enter User Details
							</Typography>
						</Toolbar>
					</AppBar>
					<TextField
						hintText="Masukkan Nama Lengkap Anda"
						floatingLabelText="Nama Lengkap"
						style={styles.textArea}
						onChange={handleChange('name')}
						defaultValue={values.name}
					/>
					<br />
					<TextField
						hintText="Masukkan Nomor Telepon Anda"
						floatingLabelText="Nomor Telepon"
						style={styles.textArea}
						onChange={handleChange('phone')}
						defaultValue={values.phone}
					/>
					<br />
					<TextField
						hintText="Masukkan Email Anda"
						floatingLabelText="Email"
						onChange={handleChange('email')}
						defaultValue={values.email}
						style={styles.textArea}
					/>
					<br />
					<TextField
						hintText="Masukkan Alamat Anda"
						floatingLabelText="Alamat"
						onChange={handleChange('address')}
						defaultValue={values.address}
						style={styles.textArea}
					/>
					<Button
						style={{ margin: 15, backgroundColor: 'lime', color: 'white' }}
						onClick={this.continue}
					>
						Continue
					</Button>
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	button: {
		margin: 15
	},
	textArea: {
		marginRight: 15,
		marginLeft: 15,
		width: '90%',
		borderBottomColor: 'red',
		'&:active': {
			borderColor: '#005cbf',
			borderBottomColor: 'red'
		},
		'&:focus': {
			borderColor: '#005cbf',
			borderBottomColor: 'red'
		}
	},
	appBar: {
		height: '56px',
		position: 'relative',
		backgroundColor: '#333c4e'
	}
};

export default withRouter(FormUserDetails);
