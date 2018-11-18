import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBubble from "@material-ui/icons/Chat";
import imageFaq from './svg/FAQV1.svg';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: "10px",
  },
  absolute: {
    position: "absolute",
     color: "#00c43e",
     backgroundColor: "#00c43e",
     bottom: theme.spacing.unit * 12,
     right: theme.spacing.unit * 5,
     zIndex: 100,
   },
   content: {
    textAlign: "left",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'left'  
  },
  iconchat: {
    color: "#fff",
    "&:hover": {
      color: "#00c43e"
    }
  },
  image: {
    margin: "90px 0 10px 0",
  }
});

class FaqContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
         <img src={imageFaq} width="200" height="200" alt="FAQ Logo" retina_logo_url="" className={classes.image} />
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Apakah MoreTrash itu?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Bagaimana cara saya menukarkan sampah?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <Tooltip>
            <Button variant="fab" color="#00c43e" id="tooltip" className={classes.absolute}>
              <ChatBubble className={classes.iconchat} />
            </Button>
          </Tooltip>
      </div>
    )
  }
}

FaqContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FaqContainer);