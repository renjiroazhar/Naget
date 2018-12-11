import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';

class Navbar extends Component {
	state = {
		searchItem: '',
		data: [],
		orderData: [],
		visible: false,
		modal1: false,
		modal2: false
	};

	render() {
		return (
			<div>
				<NavBar
					mode="dark"
					style={{
						backgroundColor: '#16a085',
						height: '60px',
						position: 'fixed',
						zIndex: '100',
						width: '100%',
						top: 0
					}}
				>
					<img
						src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
						srcSet="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
						width="120px"
						height="35px"
						alt="Moretrash Logo"
						retina_logo_url=""
						className="fusion-standard-logo"
					/>
				</NavBar>
			</div>
		);
	}
}

export default Navbar;
