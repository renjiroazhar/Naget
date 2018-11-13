import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,
    position: "fixed", /* Safari */
    width: "100%",
    top: 0,
    zIndex: 100,
  },
};

class Header extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="default" style={{ backgroundColor: "#559351" }}>
            <Toolbar>
              <div style={{
                display: "block",
                margin: "0 auto"
              }} >
                <img src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png" srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x" width="171" height="50" alt="Moretrash Logo" retina_logo_url="" className="fusion-standard-logo" style={{
                  display: "block",
                  margin: "0 auto", padding: "12px"
                }} />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <br />
        <br />
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);