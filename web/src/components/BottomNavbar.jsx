import React from 'react';
import { TabBar } from 'antd-mobile';
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

const BottomNavbar = props => {
	return (
		<div
			style={{
				width: '100%',
				position: 'fixed',
				bottom: '0'
			}}
		>
			<TabBar
				unselectedTintColor="#949494"
				tintColor="#33A3F4"
				barTintColor="white"
			>
				<TabBar.Item
					title="List"
					key="list"
					icon={<Icon type="home" />}
					selectedIcon={<Icon type="home" />}
					selected={props.selectedTab === 'list'}
					onPress={() => {
						props.history.push('/home');
						props.onChangeTab('list');
					}}
				/>

				<TabBar.Item
					icon={<Icon type="book" />}
					selectedIcon={<Icon type="book" />}
					title="History"
					key="history"
					// dot
					selected={props.selectedTab === 'history'}
					onPress={() => {
						props.history.push('/history');
						props.onChangeTab('history');
					}}
				/>
				<TabBar.Item
					icon={<Icon type="question-circle" />}
					selectedIcon={<Icon type="question-circle" />}
					title="Help"
					key="help"
					// badge={"new"}
					selected={props.selectedTab === 'help'}
					onPress={() => {
						props.history.push('/help');
						props.onChangeTab('help');
					}}
				/>

				<TabBar.Item
					icon={<Icon type="user" />}
					selectedIcon={<Icon type="user" />}
					title="Account"
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

export default withRouter(BottomNavbar);
