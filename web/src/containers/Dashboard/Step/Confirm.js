import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';

export class Confirm extends Component {
	async continue(e) {
		e.preventDefault();
		await this.props.handleUpload();
		await this.props.nextStep();
	}

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const {
			values: { name, phone, email, address, previewGeneralPhotos, time }
		} = this.props;

		return (
			console.log(this.props.values),
			(
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
							<ListItem primaryText="Nama Lengkap" secondaryText={name} />
							<ListItem primaryText="Nomor Telepon" secondaryText={phone} />
							<ListItem primaryText="Email" secondaryText={email} />
							<ListItem primaryText="Alamat" secondaryText={address} />
							<ListItem
								primaryText="Jam"
								secondaryText={moment(time).format('HH:MM')}
							/>
							<ListItem primaryText="Tanggal" secondaryText={address} />
							<ListItem primaryText="Foto : " />
							{previewGeneralPhotos.length > 0 ? (
								<div>
									<div>
										{previewGeneralPhotos.map((file, i) => (
											<div style={{ textAlign: 'center' }}>
												<img
													src={URL.createObjectURL(file)}
													alt="preview failed"
													key={file.base64}
													width="200px"
													height="200px"
													style={{ display: 'block', margin: '20px' }}
												/>
											</div>
										))}
									</div>
								</div>
							) : null}
						</List>

						<br />
						<RaisedButton
							label="Confirm & Continue"
							primary={true}
							style={styles.button}
							onClick={this.props.nextStep}
						/>
						<RaisedButton
							label="Back"
							primary={false}
							style={styles.button}
							onClick={this.back}
						/>
					</React.Fragment>
				</MuiThemeProvider>
			)
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
