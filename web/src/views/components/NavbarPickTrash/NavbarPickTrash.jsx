import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowBack';

const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed' /* Safari */,
		width: '100%',
		top: 0,
		zIndex: 100
	}
};

class NavbarPickTrash extends Component {
	handleBack = () => {
		this.props.history.push('/');
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<AppBar
						style={{ width: '100%', backgroundColor: '#fecb00ff' }}
						position="static"
					>
						<Toolbar style={{ paddingLeft: 0 }}>
							<IconButton
								onClick={this.handleBack}
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
							>
								<ArrowLeft style={{ fontSize: '1.3rem' }} />
							</IconButton>
							<Typography
								variant="title"
								color="inherit"
								className={classes.grow}
							>
								Pick Trash
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
			</div>
		);
	}
}

NavbarPickTrash.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(withRouter(NavbarPickTrash));
