import React, { Component } from "react";
import "./style/home.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import Carousel from "./Carousel";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBubble from '@material-ui/icons/Chat';
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5,
    color: "#00c43e",
    backgroundColor: "#00c43e"
    
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "100%",
    fontWeight: 400,
    color: "white",
    backgroundColor: "#00c43e",
    textDecoration: "none"
  },
  cssRoot: {
    color: "black",
    backgroundColor: "white",
    maxWidth: "350px",
    width: "100%",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: purple[700]
    }
  },
  iconchat: {
    color: "#fff",
    "&:hover": {
      color : "#00c43e"
    }
  },
  bootstrapRoot: {
    boxShadow: "none",
    textTransform: "none",
    maxWidth: "380px",
    width: "100%",
    fontSize: 16,
    fontWeight: 400,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    color: "white",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      color: "white"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  snackbar: {
    position: "absolute"
  },
  snackbarContent: {
    width: 360
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: {
    useNextVariants: true
  }
});

class Homepage extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="home">
        <div className="container">
          <img
            src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
            srcSet="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
            width="171"
            height="50"
            alt="Moretrash Logo"
            retina_logo_url=""
            className="fusion-standard-logo"
            style={{ marginTop: "100px" }}
          />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", fontWeight: 400 }}>
              Drop Your Trash and get benefit!
            </p>
            <center>
              <Carousel />
            </center>
          </div>

          <Grid container spacing={24}>
            <Grid item xs={12} s={12}>
              <MuiThemeProvider theme={theme}>
                <Link to="/form" style={{ textDecoration: "none" }}>
                  <Button
                    variant="extendedFab"
                    color="primary"
                    className={classes.margin}
                    size="large"
                  >
                    Pick Trash
                  </Button>
                </Link>
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="extendedFab"
                color="primary"
                className={classNames(classes.margin, classes.cssRoot)}
                style={{ margin: "10px , 0, 10px,  0", width: "" }}
                size="large"
              >
                Masuk
              </Button>
              </Link>
            </Grid>
          </Grid>

          <Tooltip>
            <Button variant="fab" color="#00c43e" className={classes.absolute}>
              <ChatBubble className={classes.iconchat} />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Homepage);
