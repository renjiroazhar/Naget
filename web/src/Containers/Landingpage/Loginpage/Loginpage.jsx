import React, { Component } from "react";
import "./style/login.css";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import ChatBubble from "@material-ui/icons/Chat";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { RemoveRedEye } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/authActions";
import Socmed from "./Socmed/Socmed";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    color: "#00c43e",
    backgroundColor: "#00c43e",
    position: "fixed",
    right: "0px",
    bottom: "0px",
    marginBottom: "40px",
    marginRight: "24px"
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
      color: "#00c43e"
    }
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
    },
    "&:hover": {
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
  },
  eye: {
    cursor: "pointer"
  }
});

class Loginpage extends Component {
  state = {
    open: false,
    redirect: false,
    email: "",
    password: "",
    passwordIsMasked: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state);
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  loginEmailPassword = e => {
    this.props.signIn(this.state);
  };

  loginGoogle = e => {
    this.props.signInWithGoogle();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.loginEmailPassword();
    }
  };

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };

  render() {
    const { classes } = this.props;
    const { passwordIsMasked } = this.state;
    const { authError, redirect } = this.props;
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
            className="moretrash-logo"
          />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", fontWeight: 400 }}>
              Drop Your Trash and get benefit!
            </p>
            <div style={{ textAlign: "center" }}>
              <Grid container spacing={24}>
                <Grid item xs={12} s={12}>
                  <FormControl className="margin-form">
                    <InputLabel
                      htmlFor="custom-css-input"
                      FormLabelClasses={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused
                      }}
                    >
                      Email
                    </InputLabel>
                    <Input
                      classes={{
                        underline: classes.cssUnderline
                      }}
                      onKeyPress={this.handleKeyPress}
                      id="email"
                      type="email"
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} s={12}>
                  <FormControl className="margin-form">
                    <TextField
                      label="Password"
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused
                        }
                      }}
                      classes={{
                        underline: classes.cssUnderline
                      }}
                      autoComplete="current-password"
                      margin="normal"
                      onKeyPress={this.handleKeyPress}
                      id="password"
                      type={passwordIsMasked ? "text" : "password"}
                      onChange={this.handleChange}
                      {...this.props}
                      style={{
                        width: "100%",
                        maxWidth: "345px",
                        borderColor: "#fff",
                        color: "#fff",
                        borderBottomColor: "white"
                      }}
                      InputProps={{
                        classes: {
                          underline: classes.cssUnderline
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <RemoveRedEye
                              className={classes.eye}
                              style={{ cursor: "pointer", color: "#ffffff" }}
                              onClick={() => {
                                this.togglePasswordMask();
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div className="red-text center">
                      {authError ? <p>{authError}</p> : ""}
                    </div>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={12} s={12}>
                  <Link
                    to="/forgot_password"
                    style={{ textDecoration: "none" }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        marginTop: "25px",
                        marginBottom: "25px"
                      }}
                    >
                      Lupa Password ?
                    </h4>
                  </Link>
                </Grid>
              </Grid>
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
                    onClick={e => {
                      e.preventDefault();
                      this.loginEmailPassword();
                    }}
                  >
                    Masuk
                  </Button>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </div>

          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "#999" }}>
              Belum Punya Akun?{" "}
              <a href="/signup" style={{ color: "white", fontSize: "19px" }}>
                Sign Up
              </a>
            </h4>
          </div>

          <div style={{ textAlign: "center" }}>
            <h4 href="" style={{ color: "white" }}>
              Atau masuk menggunakan
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <Socmed />
          </div>

          <Button
            variant="fab"
            id="button-daftar"
            color="primary"
            
            className={classes.absolute}
          >
            <ChatBubble className={classes.iconchat} />
          </Button>
        </div>
        {redirect ? <Redirect to="/home" /> : ""}
      </div>
    );
  }
}

Loginpage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch, props) => {
  console.log(props);
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

const mapStateToProps = state => {
  console.log(state);
  return {
    authError: state.auth.authError,
    redirect: state.auth.redirect,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Loginpage));
