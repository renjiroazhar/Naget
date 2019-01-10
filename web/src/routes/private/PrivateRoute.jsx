import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BottomNavigationBar from '../../component/BottomNavigationBar';
import Loadable from 'react-loadable';
import Loader from '../../component/Loaders/component/Loader';

const HomeContainer = Loadable({
	loader: () => import('../../containers/Dashboard/Home/HomeContainer'),
	loading: Loader
});

const OrderContainer = Loadable({
	loader: () => import('../../containers/Dashboard/Order/OrderContainer'),
	loading: Loader
});

const Help = Loadable({
	loader: () => import('../../containers/Dashboard/Help'),
	loading: Loader
});

const Account = Loadable({
	loader: () => import('../../containers/Dashboard/Account/Account'),
	loading: Loader
});

const Checkout = Loadable({
	loader: () => import('../../containers/Dashboard/Step/Checkout'),
	loading: Loader
});

const OrderDetail = Loadable({
	loader: () =>
		import('../../containers/Dashboard/Order/OrderDetail/OrderDetail'),
	loading: Loader
});

const EditOrder = Loadable({
	loader: () => import('../../containers/Dashboard/Order/EditOrder'),
	loading: Loader
});

export default class PublicRoute extends Component {
	state = {
		selectedTab: 'home'
	};

	onChangeTab = selectedTab => {
		// console.log('hello')
		this.setState({
			selectedTab: selectedTab
		});
	};

	render() {
		const currentPath = window.location.pathname;

		return (
			<div>
				<Route
					render={({ location }) => (
						<Switch location={location}>
							<Route exact path="/" component={HomeContainer} />
							<Route path="/order" component={OrderContainer} />
							<Route path="/help" component={Help} />
							<Route path="/account" component={Account} />
							<Route path="/form_login" component={Checkout} />
							<Route path="/orderdetail/:id" component={OrderDetail} />
							<Route path="/editorder/:id" component={EditOrder} />
						</Switch>
					)}
				/>
				{!currentPath.includes('form_login') &&
				!currentPath.includes('orderdetail') &&
				!currentPath.includes('order') &&
				!currentPath.includes('help') &&
				!currentPath.includes('account') ? (
					<BottomNavigationBar
						selectedTab={this.state.selectedTab}
						onChangeTab={this.onChangeTab}
					/>
				) : null}
			</div>
		);
	}
}
