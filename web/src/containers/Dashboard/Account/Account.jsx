import React from 'react';
import EditProfil from './AccountEdit/Dialog/EditProfil';
import GantiPassword from './AccountEdit/Dialog/GantiPassword';
import Faq from './AccountEdit/Dialog/Faq';
import Rate from './AccountEdit/Dialog/Rate';
import Tentang from './AccountEdit/Dialog/Tentang';
import Testimoni from './AccountEdit/Dialog/Testimoni';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';
import Divider from '@material-ui/core/Divider';
import Navbar from '../../../component/Navbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<div style={{ marginBottom: '10%', backgroundColor: '#e7e7e7' }}>
				<Navbar />
				<div style={{ marginTop: '5px' }}>
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
							marginTop: '10%',
							marginBottom: '15%',
							backgroundColor: '#f43c3c',
							width: '90%',
							textAlign: 'center',
							color: '#ffffff'
						}}
						onClick={this.handleClickOpen}
					>
						Keluar
					</Button>
				</div>
				{/*Tooltip*/}
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Anda yakin?'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Keluar
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Tidak
						</Button>
						<Button onClick={this.logout} color="primary" autoFocus>
							Ya
						</Button>
					</DialogActions>
				</Dialog>
			</div>
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
