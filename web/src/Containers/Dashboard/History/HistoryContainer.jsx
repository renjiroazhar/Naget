import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBubble from "@material-ui/icons/Chat";


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px",
  },
  absolute: {
    position: "absolute",
    color: "#00c43e",
    backgroundColor: "#00c43e",
    bottom: theme.spacing.unit * 12,
    right: theme.spacing.unit * 5,
    zIndex: 100,
  },
  card: {
    display: 'flex',
  },
  content: {
    fontSize: "12px",
    textAlign: "left",
  },
  cover: {
    width: 151,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconchat: {
    color: "#fff",
    "&:hover": {
      color: "#00c43e"
    }
  },
  title: {
    margin: "70px 0 10px 0",
    textAlign: "center",
    color: "#00c43e",
  }
});


class HistoryContainer extends Component {

  state = {
    historyList: [],
    trashPic: [],
    trashDesc: '',
    trashTitle: '',
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Typography component="h5" variant="h5" className={classes.title}>
            HISTORY
          </Typography>
          {this.state.historyList.map(() => (
            <Card className={classes.card}>
              <CardMedia
                className={classes.cover}
                image={this.state.trashPic}
                alt="Trash Picture"
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h6" variant="h6">
                    {this.state.trashTitle}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {this.state.trashDesc}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        <Tooltip>
          <Button variant="fab" color="#00c43e" id="tooltip" className={classes.absolute}>
            <ChatBubble className={classes.iconchat} />
          </Button>
        </Tooltip>
      </div>
    )
  }
}

HistoryContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HistoryContainer);