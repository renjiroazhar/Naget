import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import imageFaq from './svg/help.svg';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from '../../../component/Navbar';
class Help extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div style={{ backgroundColor: '#e7e7e7' }}>
				<Navbar />
				<div style={{ textAlign: 'center' }}>
					<img
						src={imageFaq}
						width="200"
						height="200"
						alt="FAQ Logo"
						retina_logo_url=""
						className={classes.image}
					/>
				</div>
				<div className={classes.root}>
					<ExpansionPanel>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Apakah Moretrash Itu?
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget.
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Bagaimana cara menukarkan sampah?
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget.
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</div>
			</div>
		);
	}
}

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: '10px'
	},
	content: {
		textAlign: 'left'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		textAlign: 'left'
	},
	image: {
		margin: '40px 0 10px 0'
	}
});

Help.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Help);
