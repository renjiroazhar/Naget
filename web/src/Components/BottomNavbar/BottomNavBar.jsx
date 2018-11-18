import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountIcon from '@material-ui/icons/AccountCircleRounded';
import RestoreIcon from '@material-ui/icons/Restore';
import HomeIcon from '@material-ui/icons/Home';
import ChatBubble from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    borderStyle: "solid",
    border: "1px 0px 0px 0px",
    borderColor: "#f7f7f7",
  }
};

class BottomNavBar extends React.Component {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation showLabels value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/home" />
        <BottomNavigationAction label="Orders" value="orders" icon={<RestoreIcon />} component={Link} to="/orders" />
        <BottomNavigationAction label="Help" value="help" icon={<ChatBubble />} component={Link} to="/help" />
        <BottomNavigationAction label="Account" value="account" icon={<AccountIcon />} component={Link} to="/account" />
      </BottomNavigation>
    );
  }
}

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavBar);