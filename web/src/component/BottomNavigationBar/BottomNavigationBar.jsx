import React from 'react';
import { TabBar } from 'antd-mobile';
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import './style/style.css';

const BottomNavigationBar = props => {
	return (
		<div
			style={{
				width: '100%',
				position: 'fixed',
				bottom: '0'
			}}
		>
			<TabBar
				unselectedTintColor="#696969"
				tintColor="#00c43e"
				style={{ height: '56px', fontSize: '18px' }}
				barTintColor="white"
			>
				<TabBar.Item
					title={<p style={{ margin: 0, fontSize: '0.75rem' }}>Home</p>}
					key="list"
					icon={<Icon style={{ fontSize: '18px' }} type="home" />}
					selectedIcon={<Icon style={{ fontSize: '18px' }} type="home" />}
					selected={props.selectedTab === 'home'}
					onPress={() => {
						props.history.push('/');
						props.onChangeTab('home');
					}}
				/>

				<TabBar.Item
					icon={<Icon style={{ fontSize: '18px' }} type="reconciliation" />}
					selectedIcon={
						<Icon style={{ fontSize: '18px' }} type="reconciliation" />
					}
					title={<p style={{ margin: 0, fontSize: '0.75rem' }}>Order</p>}
					key="order"
					// dot
					selected={props.selectedTab === 'order'}
					onPress={() => {
						props.history.push('/order');
						props.onChangeTab('order');
					}}
				/>
				<TabBar.Item
					icon={<Icon style={{ fontSize: '18px' }} type="question-circle" />}
					selectedIcon={
						<Icon style={{ fontSize: '18px' }} type="question-circle" />
					}
					title={<p style={{ margin: 0, fontSize: '0.75rem' }}>Help</p>}
					key="help"
					// badge={"new"}
					selected={props.selectedTab === 'help'}
					onPress={() => {
						props.history.push('/help');
						props.onChangeTab('help');
					}}
				/>

				<TabBar.Item
					icon={<Icon style={{ fontSize: '18px' }} type="user" />}
					selectedIcon={<Icon style={{ fontSize: '18px' }} type="user" />}
					title={<p style={{ margin: 0, fontSize: '0.75rem' }}>Account</p>}
					key="account"
					selected={props.selectedTab === 'account'}
					onPress={() => {
						props.history.push('/account');
						props.onChangeTab('account');
					}}
				/>
			</TabBar>
		</div>
	);
};

export default withRouter(BottomNavigationBar);
