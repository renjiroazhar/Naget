import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logomoretrash from '../images/logotext.png';

const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed' /* Safari */,
		width: '100%',
		top: 0,
		zIndex: 100
	}
};

class Header extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<AppBar
						position="static"
						color="default"
						style={{ backgroundColor: '#00c43e', paddingBottom: '13px' }}
					>
						<Toolbar>
							<div>
								<img
									src={Logomoretrash}
									srcSet={Logomoretrash}
									width="245"
									height="61"
									alt="Moretrash Logo"
									retina_logo_url=""
									className="fusion-standard-logo"
									style={{
										display: 'block',
										margin: '0 auto',
										marginTop: '11px'
									}}
								/>
							</div>
						</Toolbar>
					</AppBar>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Header);
