import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed' /* Safari */,
		width: '100%',
		top: 0,
		zIndex: 100
	},
	grow: {
		color: '#ffffff',
		fontSize: '20px'
	}
};

class FixedNavbar extends Component {
	handleBack = () => {
		this.props.history.push('/');
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<AppBar
						position="static"
						color="default"
						style={{ backgroundColor: '#00c43e' }}
					>
						<Toolbar style={{ paddingLeft: 0 }}>
							<IconButton
								onClick={this.handleBack}
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
							>
								<ArrowLeft style={{ color: '#ffffff' }} />
							</IconButton>

							<Typography
								variant="title"
								color="inherit"
								className={classes.grow}
							>
								{this.props.pageName}
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
			</div>
		);
	}
}

FixedNavbar.propTypes = {
	classes: PropTypes.object.isRequired
};

const linkedNavbar = withStyles(styles)(withRouter(FixedNavbar));
export { linkedNavbar as FixedNavbar };
