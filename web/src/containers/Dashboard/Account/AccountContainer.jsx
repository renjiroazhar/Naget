import React, { Component } from 'react';
import { List, Modal } from 'antd-mobile';
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';
import Navbar from '../../../components/Navbar';
import EditProfil from './AccountEdit/Dialog/EditProfil';
import GantiPassword from './AccountEdit/Dialog/GantiPassword';
import Divider from '@material-ui/core/Divider';
import 'antd/dist/antd.css';

const Item = List.Item;
const alert = Modal.alert;

class AccountContainer extends Component {
	state = {
		dataUser: [],
		role: 0,
		name: '',
		username: '',
		password: '',
		email: ''
	};

	onChangeTab = selectedTab => {
		this.setState({
			selectedTab: selectedTab
		});
	};

	logout = () => {
		this.props.signOut();
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<div style={{ backgroundColor: '#e7e7e7', minHeight: '100vh' }}>
					<Navbar />
					<br />
					<br />
					<br />
					<EditProfil />
					<Divider />
					<br />
					<Divider />

					<GantiPassword />
					<Divider />
					<List>
						<Item
							thumb={<Icon type="question-circle" />}
							key="faq"
							style={{ color: '#999999' }}
							onClick={() => this.props.history.push('/account/input_anggaran')}
						>
							FAQ
						</Item>
					</List>
					<Divider />

					<List>
						<Item
							thumb={<Icon type="star" theme="outlined" />}
							key="rate"
							style={{ color: '#ffd700' }}
						>
							Rate GMB
						</Item>
					</List>
					<Divider />
					<List>
						<Item
							thumb={<Icon type="logout" theme="outlined" />}
							style={{ color: 'red' }}
							onClick={() =>
								alert('Logout', 'Anda Yakin?', [
									{ text: 'Cancel', onPress: () => console.log('cancel') },
									{ text: 'Ok', onPress: () => this.logout() }
								])
							}
						>
							Logout
						</Item>
					</List>
					<Divider />
				</div>
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
)(withRouter(AccountContainer));
