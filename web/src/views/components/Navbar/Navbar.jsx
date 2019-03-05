import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../../assets/img/svg/logonaget7.svg';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button1: {
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#fecb00ff',
      color: '#f5f5f5'
    }
  },
  button2: {
    border: '1px solid #ffffff',
    margin: '0 10px 0 67%',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#000000'
    }
  },
  button3: {
    backgroundColor: '#ffffff',
    color: '#000000',
    width: '85px',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#fecb00ff'
    }
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if (localStorage.getItem('email')) {
      return (
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: '#fecb00ff' }}>
            <Toolbar>
              <Link to="/">
                <img
                  src={Logo}
                  srcSet={Logo}
                  width="141"
                  height="40"
                  alt="Logo"
                  retina_logo_url=""
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Logo"
                />
              </Link>
              <Link to="/home">
                <Typography
                  color="inherit"
                  aria-label="HOME"
                  style={{
                    color: '#ffffff',
                    margin: '0 20px 0 10px',
                    '&:hover': {
                      color: '#f7f7f7'
                    }
                  }}
                >
                  HOME
                </Typography>
              </Link>
              <Link to="/order">
                <Typography
                  color="inherit"
                  aria-label="ORDER"
                  style={{
                    color: '#ffffff',
                    '&:hover': {
                      color: '#f7f7f7'
                    }
                  }}
                >
                  ORDER
                </Typography>
              </Link>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                    <h3>My Account</h3>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: '#fecb00ff' }}>
            <Toolbar>
              <Link to="/">
                <img
                  src={Logo}
                  srcSet={Logo}
                  width="141"
                  height="40"
                  alt="Logo"
                  retina_logo_url=""
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Logo"
                />
              </Link>
              <Link to="/home">
                <Button
                  color="inherit"
                  aria-label="HOME"
                  className={classes.button1}
                >
                  HOME
                </Button>
              </Link>
              <Link to="/order">
                <Button
                  color="inherit"
                  aria-label="ORDER"
                  className={classes.button1}
                >
                  ORDER
                </Button>
              </Link>
              <Button color="inherit" className={classes.button2}>
                Login
              </Button>
              <Button color="inherit" className={classes.button3}>
                Register
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
