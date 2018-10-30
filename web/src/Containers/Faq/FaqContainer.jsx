import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const styles = {
  container: {
    width: '100%',
   
    textAlign : "center",
    backgroundColor : "green",
    height: "100%"
  }
};


class FaqContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        
          <p>Faq</p>
      </div>
    )
  }
}

FaqContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FaqContainer);
