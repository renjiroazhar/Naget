import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/ChatBubble';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	fab: {
		position: 'fixed',
		right: '20px',
		bottom: '15px',
		marginBottom: 0,
		zIndex: 997,
		backgroundColor: '#fecb00ff !important'
	}
});

function TooltipButton(props) {
	const { classes } = props;
	return (
		<div>
			<Tooltip
				title="Chat"
				aria-label="Chat"
				href="https://api.whatsapp.com/send?phone=6281334429348"
				target="_blank"
			>
				<Fab color="primary" className={classes.fab}>
					<ChatIcon />
				</Fab>
			</Tooltip>
		</div>
	);
}

TooltipButton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TooltipButton);
