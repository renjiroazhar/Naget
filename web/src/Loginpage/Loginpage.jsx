import React, { Component } from "react";
import "./style/login.css";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
  },
  cssLabel: {
    "&$cssFocused": {
      color: purple[500],
    }
  },
  cssFocused: {},
  cssUnderline: {
    width: "345px",
    color: "#fff",
    "&:before": {
      borderBottomColor: "#fff",
    },
    "&:after": {
      borderBottomColor: purple[500]
    }
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

class Loginpage extends Component {
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
            srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
            width="171"
            height="50"
            alt="Moretrash Logo"
            retina_logo_url=""
            class="fusion-standard-logo"
            style={{ marginTop: "100px" }}
          />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", fontWeight: 400 }}>
              Drop Your Trash and get benefit!
            </p>

            <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
              <FormControl>
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Nama
                </InputLabel>
                <Input
                  id="custom-css-input"
                  classes={{
                    underline: classes.cssUnderline
                  }}
                />
              </FormControl>
            </div>

            <div style={{ textAlign: "center" }}>
              <FormControl>
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Password
                </InputLabel>
                <Input
                  id="custom-css-input"
                  classes={{
                    underline: classes.cssUnderline
                  }}
                />
              </FormControl>
            </div>
          </div>
          <br />
          <br />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <MuiThemeProvider theme={theme}>
                <Link to="/form" style={{ textDecoration: "none" }}>
                  <Button
                    variant="extendedFab"
                    color="primary"
                    className={classes.margin}
                    size="large"
                  >
                    Masuk
                  </Button>
                </Link>
              </MuiThemeProvider>
            </Grid>
          </Grid>
          <center>
            <Grid container spacing={3} item xs={4}>
              <Grid item xs={6}>
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
                  <p style={{ color: "white", fontWeight: 300 }}>
                    Buat akun baru
            </p>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/perbarui-sandi" style={{ textDecoration: "none" }}>
                  <p style={{ color: "white", fontWeight: 300 }}>
                    Lupa kata sandi?
                </p>
                </Link>
              </Grid>
            </Grid>
          </center>
        </div>
      </div>
    );
  }
}

Loginpage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loginpage);
