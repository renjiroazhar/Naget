import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const styles = {
    container: {
      width: '100%',
      marginTop:"50px",
      textAlign : "center",
      backgroundColor : "yellow",
      height: "100%"
    }
  };


class HistoryContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        
          <p>History</p>
      </div>
    )
  }
}

HistoryContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HistoryContainer);