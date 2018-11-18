import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import CarouselHome from './CarouselHome';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: "#000",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    maxWidth: "350px",
    width: "100%",
    margin: "90px 0 20px 0",
    borderRadius: 0,
    border: "1px solid #16a085",
    backgroundColor: "#fff",
  },
  input: {
    display: 'none',
  },
  absolute: {
    position: "absolute",
    backgroundColor: "#00c43e",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 5,
  },
  iconchat: {
    color: "#fff",
    "&:hover": {
      color: "#00c43e"
    }
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "100%",
    fontWeight: 400,
    color: "white",
    backgroundColor: "#00c43e",
    textDecoration: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#f7f7f7",
      color: "#00c43e",
    }
  },
  cardBar: {
    backgroundColor: "#00c43e",
    padding: "10px 20px 30px 20px",
  },
  text: {
      fontSize: "35px",
      textDecoration: "bold",
      margin: "10px 0 0 0"
  }
});

class HomeContainer extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <center>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.cardBar}>
                <Typography style={{ color: "#fff", float: "left" }}>
                  User
                </Typography>
                <Typography style={{ color: "#fff", float: "right" }}>
                  100
                </Typography>
              </div>
              <div style={{ marginTop: "10px", }}>
                <Typography>
                  Telah menukarkan sampah kepada
                </Typography>
                <Typography>
                  moretrash sejumlah:
                </Typography>
              </div>
              <Typography className={classes.text}>
                50 KG
                </Typography>
            </CardContent>
          </Card>
        </center>

        <center>
          <CarouselHome />
        </center>

        <div style={{ textAlign: "center", }}>
          <Button
            variant="extendedFab"
            color="primary"
            className={classes.margin}
            size="large"
            component={Link}
            to="/pick-trash">
            Pick Trash
          </Button>
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeContainer);