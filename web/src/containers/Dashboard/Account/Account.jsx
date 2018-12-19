import React from 'react';
import { Page, Toolbar } from 'react-onsenui';
import EditProfil from './AccountEdit/Dialog/EditProfil';
import GantiPassword from './AccountEdit/Dialog/GantiPassword';
import Faq from './AccountEdit/Dialog/Faq';
import Rate from './AccountEdit/Dialog/Rate';
import Tentang from './AccountEdit/Dialog/Tentang';
import Testimoni from './AccountEdit/Dialog/Testimoni';
import Button from '@material-ui/core/Button';
import { AlertDialog } from 'react-onsenui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';
import Divider from '@material-ui/core/Divider';
class Account extends React.Component {
	state = {
		open: false,
		currentPassword: '',
		newPassword: '',
		isOpen: false
	};

	logout = () => {
		this.props.signOut();
		this.props.history.push('/');
	};

	renderTab() {
		this.props.renderTab();
	}

	handleOpen = () => {
		this.setState({
			isOpen: true
		});
	};

	handleClose = () => {
		this.setState({
			isOpen: false
		});
	};
	render() {
		return (
			<Page
				renderToolbar={() => (
					<Toolbar
						transparent
						noshadow
						style={{ height: '56px', backgroundColor: '#333c4e' }}
					>
						{/* <div className="left">
					<BackButton>Back</BackButton>
				</div> */}
						<div
							className="center"
							style={{
								lineHeight: '76px',
								display: 'block',
								textAlign: 'center',
								marign: 'auto'
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
						{/* <div className="right">
					<ToolbarButton>
						<Icon icon="md-menu" />
					</ToolbarButton>
				</div> */}
					</Toolbar>
				)}
			>
				<div style={{ marginTop: '10px' }}>
					<EditProfil />
				</div>
				<Divider />
				<div>
					<GantiPassword />
				</div>

				<div>
					<Rate />
				</div>
				<div>
					<Testimoni />
				</div>
				<div style={{ marginTop: '5%' }}>
					<div>
						<Faq renderTab={() => this.props.renderTab()} />
					</div>
					<div>
						<Tentang />
					</div>
				</div>
				{/* <div>
					<Logout />
				</div> */}
				<div
					style={{
						textAlign: 'center',

						width: '100%'
					}}
				>
					<Button
						style={{
							marginTop: '15%',
							marginBottom: '5%',
							backgroundColor: '#f43c3c',
							width: '90%',
							textAlign: 'center',
							color: '#ffffff'
						}}
						onClick={this.handleOpen}
					>
						Keluar
					</Button>
				</div>
				{/*Tooltip*/}
				<AlertDialog
					isOpen={this.state.isOpen}
					onCancel={this.handleClose}
					cancelable
				>
					<div className="alert-dialog-title">Keluar</div>
					<div className="alert-dialog-content">Anda Yakin?</div>

					<Divider />
					<Button onClick={this.logout} className="alert-dialog-button">
						Ya
					</Button>
					<Button onClick={this.handleClose} className="alert-dialog-button">
						Tidak
					</Button>
				</AlertDialog>
			</Page>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withRouter(Account));
