import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { NavBar } from 'antd-mobile';

const Navbar = () => {
	return (
		<div>
			<div>
				{' '}
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
					leftContent={[
						<Link
							to="/history"
							style={{ textDecoration: 'none', color: '#ffffff' }}
						>
							<Icon type="left" />
						</Link>
					]}
					rightContent={[
						<Icon key="0" type="form" style={{ marginRight: '16px' }} />
					]}
				>
					Detail
				</NavBar>
			</div>
			<br />
			<br />
			<br />
		</div>
	);
};

export default Navbar;
