import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormUserDetails extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
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
								onClick={this.props.popPage}
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
						hintText="Enter Your First Name"
						floatingLabelText="First Name"
						style={styles.textArea}
						onChange={handleChange('firstName')}
						defaultValue={values.firstName}
					/>
					<br />
					<TextField
						hintText="Enter Your Last Name"
						floatingLabelText="Last Name"
						style={styles.textArea}
						onChange={handleChange('lastName')}
						defaultValue={values.lastName}
					/>
					<br />
					<TextField
						hintText="Enter Your Email"
						floatingLabelText="Email"
						onChange={handleChange('email')}
						defaultValue={values.email}
						style={styles.textArea}
					/>
					<br />
					<RaisedButton
						label="Selanjutnya"
						primary={true}
						style={styles.button}
						onClick={this.continue}
					/>
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
		width: '90%'
	},
	appBar: {
		height: '56px',
		position: 'relative',
		backgroundColor: '#333c4e'
	}
};

export default FormUserDetails;
