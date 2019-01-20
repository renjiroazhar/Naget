import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './style/papersheet.css';

const styles = theme => ({
	all: {
		width: '100%'
	},
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		backgroundColor: '#00c43e',
		borderRadius: 0,
	},
	text: {
		color: '#ffffff',
		fontFamily: 'Roboto, sans-serif',
		fontWeight: '200 !important'
	}
});

function PaperSheet(props) {
	const { classes } = props;

	return (
		<div className={classes.all}>
			<Paper className={classes.root} elevation={1}>
				<Typography
					variant="h5"
					component="h6"
					className={classes.text}
					style={{ fontSize: '22px', textAlign: 'center' }}
				>
					Moretrash is "Ojek for Trash"
				</Typography>
				<p
					style={{ textAlign: 'center', fontWeight: 'lighter', color: '#fff' }}
				>
					Moretrash is a service that helps sales of recyclable garbage
					and household garbage (trash management platformon line)
				</p>
			</Paper>
		</div>
	);
}

PaperSheet.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
