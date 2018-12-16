import React, { Component } from 'react';
import MainApp from './MainApp';
import NotFound from '../../containers/Landingpage/NotFound';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import OrderDetail from '../../containers/Dashboard/Order/OrderDetail';
import './style/style.css';
export default class PrivateRoutes extends Component {
	render() {
		return (
			<div>
				<Route path="/home" component={MainApp} />
				<Route path="/home/:id" component={OrderDetail} />
				<Route component={NotFound} />
				/>
			</div>
		);
	}
}
