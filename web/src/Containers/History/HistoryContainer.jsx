import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  title: {
    marginTop: "30px",
    color: "#fff",
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px",
  },
});


class HistoryContainer extends Component {

  state= {
    historyList: [],
    trashPic: [],
    trashDesc: '',
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h6" className={classes.title}>
          Exchange History
        </Typography>
        <div className={classes.root}>
          <List>
            {this.state.historyList.map(value => (
              <ListItem key={value} dense button>
                <Avatar alt="Trash Picture" src={this.state.trashPic} />
                <ListItemText primary={this.state.trashDesc} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

HistoryContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HistoryContainer);