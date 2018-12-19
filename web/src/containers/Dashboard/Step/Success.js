import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import { Icon } from 'react-onsenui';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

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

	backPage = () => {
		this.props.popPage();
		this.props.changeVisibilityTrue();
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
					<AppBar
						position="static"
						color="default"
						style={{ backgroundColor: '#333c4e' }}
					>
						<Toolbar>
							<div
								className="center"
								style={{
									display: 'block',
									textAlign: 'center',
									margin: 'auto'
								}}
							>
								<img
									src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
									srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
									width="120px"
									height="35px"
									alt="Moretrash Logo"
									retina_logo_url=""
									class="fusion-standard-logo"
								/>
							</div>
						</Toolbar>
					</AppBar>

					<div style={{ textAlign: 'center' }}>
						<h3 style={{ textAlign: 'center' }}>Pick Trash Berhasil</h3>
						<p style={{ textAlign: 'center' }}>
							Terimakasih telah berkontribusi
						</p>
					</div>

					<div style={{ textAlign: 'center' }}>
						<Button
							style={{ margin: 15, backgroundColor: 'lime', color: 'white' }}
							onClick={this.backPage}
						>
							Kembali Ke Beranda
						</Button>
					</div>
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

export default Success;
