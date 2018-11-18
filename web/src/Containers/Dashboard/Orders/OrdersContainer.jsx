import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px",
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
      </div>
    )
  }
}

HistoryContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HistoryContainer);