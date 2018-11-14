import React, { Component } from "react";
import "../Homepage/style/home.css";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBubble from "@material-ui/icons/Chat";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Carousel from "./Carousel";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
   position: "absolute",
    color: "#00c43e",
    backgroundColor: "#00c43e",
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5,
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "100%",
    borderRadius : 0,
    fontWeight: 400,
    color: "white",
    backgroundColor: "#00c43e",
    textDecoration: "none"
  },
  marginForm: {
    maxWidth: "350px",
    width: "100%",
    fontWeight: 400,
    color: "white",
    textDecoration: "none"
  },
  cssRoot: {
    color: "black",
    backgroundColor: "white",
    maxWidth: "350px",
    width: "100%",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "white"
    }
  },
  cssLabel: {
    color: "#999",
    "&$cssFocused": {
      color: "white"
    }
  },
  cssFocused: {},
  cssUnderline: {
    width: "100%",
    maxWidth: "345px",
    borderColor: "#fff",
    color: "#fff",
    borderBottomColor: "white",
    "&:before": {
      borderBottomColor: "white"
    },
    "&:after": {
      borderBottomColor: "white"
    }
  },
  iconchat: {
    color: "#fff",
    "&:hover": {
      color: "#00c43e"
    }
  },
  bootstrapRoot: {
    boxShadow: "none",
    textTransform: "none",
    maxWidth: "350px",
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
    position: "absolute",
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5,
  },
  snackbarContent: {
    width: 360
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
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
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
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
    open: false,
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
            srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
            width="171"
            height="50"
            alt="Moretrash Logo"
            retina_logo_url=""
            className="moretrash-logo"
            />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", fontWeight: 400 }}>
              Drop Your Trash and get benefit!
            </p>
            <div style={{ textAlign: "center" }}>
              <div className="carousel-center">
                <Carousel />
              </div>
            </div>
          </div>
<div className="login-button">
          <Grid container spacing={24}>
            <Grid item xs={12} s={12}>
              <MuiThemeProvider theme={theme}>
                <Button
                  variant="extendedFab"
                  color="primary"
                  className={classes.margin}
                  size="large"
                  component={Link}
                  to="/form"
                >
                  Pick Trash
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
          
          <Grid container spacing={24}>
            <Grid item xs={12} s={12}>
              <MuiThemeProvider theme={theme}>
                <Button
                  variant="extendedFab"
                  color="primary"
                  className={classes.margin}
                  size="large"
                  component={Link}
                  to="/login"
                >
                  Masuk
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>

</div>
<Tooltip>
            <Button variant="fab" color="#00c43e" id="tooltip" className={classes.absolute}>
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
