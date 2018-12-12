import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#16a085',
		height: '60px'
	},
	toolBar: {
		height: '60px'
	},
	flex: {
		flex: 1,
		fontSize: '17px'
	}
});

const Navbar = props => {
	const { classes } = props;
	return (
		<div>
			<div>
				{' '}
				<AppBar className={classes.appBar}>
					<Toolbar className={classes.toolBar}>
						<IconButton
							component={Link}
							to="/history"
							color="inherit"
							aria-label="Close"
						>
							<ArrowBack />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.flex}>
							Detail Pemesanan
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		</div>
	);
};

Navbar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
