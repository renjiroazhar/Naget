import React from 'react';
import Lottie from 'lottie-react-web';
import LoaderIcon from '../json/loader_4.json';

const Loader = () => {
	return (
		<div style={cssInJs.backgroundLoading}>
			<div style={cssInJs.loading}>
				<Lottie
					width="250px"
					height="250px"
					options={{
						animationData: LoaderIcon
					}}
				/>
			</div>
		</div>
	);
};

const cssInJs = {
	loading: {
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',
		position: 'absolute'
	},
	backgroundLoading: {
		height: '100%',
		minHeight: '100vh',
		overflow: 'hidden',
		backgroundColor: '#f5f5f5'
	}
};

export default Loader;
