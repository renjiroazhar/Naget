import React, { Component } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import AccountContainer from '../containers/Dashboard/Account/AccountContainer';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router';
import Lottie from 'lottie-react-web';
import Planet from './json/planet_rotating.json';

const loading = () => (
	<div style={{ marginTop: '200px' }}>
		<Lottie
			width="200px"
			height="200px"
			options={{
				animationData: Planet
			}}
		/>
	</div>
);

const Home = Loadable({
	loader: () => import('../containers/Dashboard/Home'),
	loading: loading
});

const History = Loadable({
	loader: () => import('../containers/Dashboard/History'),
	loading: loading
});

const ResetPassword = Loadable({
	loader: () => import('../containers/Dashboard/Account/ResetPassword'),
	loading: loading
});

const InputAnggaran = Loadable({
	loader: () => import('../containers/Dashboard/Account/InputAnggaran'),
	loading: loading
});

class DashboardRoutes extends Component {
	// state = {
	//   selectedTab: "list"
	// }

	state = {
		openKeys: ['sub1'],
		status: 0,
		data: [],
		name: '',
		merk: '',
		spec: '',
		lastPurchaser: '',
		store: '',
		address: '',
		telephone: '',
		web: '',
		description: '',
		note: '',
		lastPrice: 0,
		total: 0,
		count: 0,
		unitPrice: 0,
		purchasePrice: 0,

		id: '',
		HistoryId: '',
		loading: false,

		selectedTab: 'list'
	};

	onChangeTab = selectedTab => {
		// console.log('hello')
		this.setState({
			selectedTab: selectedTab
		});
	};

	logout = () => {
		//client.logout();
		this.props.updateLogout();
	};

	render() {
		return (
			<div>
				<Route
					render={({ location }) => (
						<Switch location={location}>
							<Route exact path="/home" component={Home} />
							<Route exact path="/history" component={History} />
							<Route
								exact
								path="/account"
								render={() => <AccountContainer updateLogout={this.logout} />}
							/>
							<Route
								exact
								path="/account/reset_password"
								component={ResetPassword}
							/>
							<Route
								exact
								path="/account/input_anggaran"
								component={InputAnggaran}
							/>
						</Switch>
					)}
				/>
				<BottomNavbar
					selectedTab={this.state.selectedTab}
					onChangeTab={this.onChangeTab}
				/>
			</div>
		);
	}
}

export default DashboardRoutes;
