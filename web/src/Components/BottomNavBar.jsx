import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountIcon from '@material-ui/icons/AccountCircleRounded';
import RestoreIcon from '@material-ui/icons/Restore';
import HomeIcon from '@material-ui/icons/Home';
import ChatBubble from '@material-ui/icons/Chat';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px'
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
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
         <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="History" value="history" icon={<RestoreIcon />} />
        <BottomNavigationAction label="FAQ" value="FAQ" icon={<ChatBubble />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<AccountIcon />} />
      </BottomNavigation>
    );
  }
}

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavBar);