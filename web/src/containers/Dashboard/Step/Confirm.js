import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export class Confirm extends Component {
	continue = e => {
		e.preventDefault();
		// PROCESS FORM //
		this.props.nextStep();
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const {
			values: { firstName, lastName, email, occupation, city, bio }
		} = this.props;
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
								Konfirmasi
							</Typography>
						</Toolbar>
					</AppBar>
					<List>
						<ListItem primaryText="First Name" secondaryText={firstName} />
						<ListItem primaryText="Last Name" secondaryText={lastName} />
						<ListItem primaryText="Email" secondaryText={email} />
						<ListItem primaryText="Occupation" secondaryText={occupation} />
						<ListItem primaryText="City" secondaryText={city} />
						<ListItem primaryText="Bio" secondaryText={bio} />
					</List>
					<br />
					<RaisedButton
						label="Confirm & Continue"
						primary={true}
						style={styles.button}
						onClick={this.continue}
					/>
					<RaisedButton
						label="Back"
						primary={false}
						style={styles.button}
						onClick={this.back}
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
	appBar: {
		height: '56px',
		position: 'relative',
		backgroundColor: '#333c4e'
	},
	flex: 1
};

export default Confirm;
