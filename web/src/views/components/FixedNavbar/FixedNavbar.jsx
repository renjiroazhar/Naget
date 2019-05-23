import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
const styles = {
  root: {
    flexGrow: 1,
    position: "fixed" /* Safari */,
    width: "100%",
    top: 0,
    zIndex: 100
  },
  grow: {
    color: "#ffffff",
    fontSize: "20px",
    marginLeft: "5%"
  }
};

class FixedNavbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AppBar
            position="static"
            color="default"
            style={{ backgroundColor: "#fecb00ff" }}
          >
            <Toolbar style={{ paddingLeft: 0 }}>
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
