import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

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
          <AppBar position="static" color="default" style={{ backgroundColor: "#16a085", paddingBottom: '7px' }}>
            <Toolbar>
              <div style={{
                display: "block",
                margin: "0 auto"
              }} >
                <Link to="/home" >
                  <img src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png" srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x" width="120" height="35" alt="Moretrash Logo" retina_logo_url="" className="fusion-standard-logo" style={{
                    display: "block",
                    margin: "0 auto",
                  }} />
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);