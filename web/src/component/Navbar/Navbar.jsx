import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed' /* Safari */,
		width: '100%',
		top: 0,
		zIndex: 100
	}
};

class Navbar extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<AppBar
						style={{
							width: '100%',
							backgroundColor: '#00c43e'
						}}
						position="static"
					>
						<Toolbar style={{ paddingLeft: 0 }}>
							<div>
								<div
									style={{
										display: 'block',
										margin: '0 auto'
									}}
								>
									<IconButton
										onClick={() => {
											this.props.history.push('/');
										}}
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<ArrowLeft style={{ color: '#ffffff' }} />
									</IconButton>
								</div>
							</div>
						</Toolbar>
					</AppBar>
				</div>
			</div>
		);
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(withRouter(Navbar));
