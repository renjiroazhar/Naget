import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Icon } from 'react-onsenui';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export class Success extends Component {
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
		const { values } = this.props;
		if (values.loading) {
			return (
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						height: '100%',
						position: 'relative',
						top: 'calc(50% - 10px)'
					}}
				>
					<Icon size={35} spin={true} icon="ion-load-d" />
					<br />
					Loading
				</div>
			);
		}
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar style={styles.appBar}>
						<Toolbar>
							<Typography variant="h6" color="inherit" style={{ flex: 1 }}>
								Finish
							</Typography>
						</Toolbar>
					</AppBar>
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

export default Success;
