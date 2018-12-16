import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

const Navbar = props => {
	return (
		<div>
			<div>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => props.history.push('/history')}
					style={{
						height: '56px',
						color: '#ffffff',
						backgroundColor: '#16a085'
					}}
				>
					<div style={{ color: '#ffffff' }}>Detail Order</div>
				</NavBar>
			</div>
		</div>
	);
};

export default withRouter(Navbar);
