import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const styles = {
  container: {
    width: '100%',
    textAlign : "center",
    backgroundColor : "blue",
    height: "100%"
  }
};


class AccountContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
          <p>Account</p>
      </div>
    )
  }
}

AccountContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountContainer);
