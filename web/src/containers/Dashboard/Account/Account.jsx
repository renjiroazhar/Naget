import React from 'react';
import EditProfil from './AccountEdit/Dialog/EditProfil';
import GantiPassword from './AccountEdit/Dialog/GantiPassword';
import Help from './AccountEdit/Dialog/Help';
import Rate from './AccountEdit/Dialog/Rate';
import Tentang from './AccountEdit/Dialog/Tentang';
import Testimoni from './AccountEdit/Dialog/Testimoni';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';
import Divider from '@material-ui/core/Divider';
import FixedNavbar from '../../../component/FixedNavbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
			<div
				style={{
					backgroundColor: '#e7e7e7'
				}}
			>
				<FixedNavbar pageName="Account" />
				<div style={{ marginTop: '57px' }}>
					<EditProfil />
				</div>
				<div style={{ marginTop: '3%' }}>
					<GantiPassword />
				</div>
				<Divider />
				<div>
					<Rate />
				</div>
				<Divider />
				<div>
					<Testimoni />
				</div>
				<div style={{ marginTop: '3%' }}>
					<div>
						<Help renderTab={() => this.props.renderTab()} />
					</div>
					<Divider />
					<div>
						<Tentang />
					</div>
				</div>
				{/* <div>
					<Logout />
				</div> */}
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{'You sure want to leave?'}
					</DialogTitle>
					<DialogActions>
						<Button varian="contained" onClick={this.handleClose} color="primary">
							No
						</Button>
						<Button varian="contained" onClick={this.logout} color="primary" autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
				<div
					style={{
						textAlign: 'center',
						width: '100%',
						margin: '0 0 5px 0'
					}}
				>
					<Button varian="contained"
						style={{
							backgroundColor: '#ffffff',
							width: '100%',
							textAlign: 'center',
							color: '#f43c3c',
							height: '46px'
						}}
						onClick={this.handleClickOpen}
					>
						Logout
					</Button>
				</div>
				<br />
				<br />
				<br />
				{/*Tooltip*/}
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
