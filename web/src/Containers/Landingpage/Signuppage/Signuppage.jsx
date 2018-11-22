import React, { Component } from "react";
import "./style/signup.css";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import ChatBubble from "@material-ui/icons/Chat";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { signUp } from "../../../store/actions/authActions";
import { Redirect } from 'react-router-dom';

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

class Signuppage extends Component {
  state = {
    open: false,
    name: "",
    phone: 0,
    address: "",
    email: "",
    password: "",
    passwordIsMasked: true
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleClick = () => {
    this.setState({ open: true });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.signUp(this.state);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };

  render() {
    const { classes, auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/home" />

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
              <FormControl className="margin-form">
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Nama Lengkap
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  onKeyPress={this.handleKeyPress}
                  id="name"
                  type="text"
                  onChange={this.handleChange}
                />
              </FormControl>
                  <br/>
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
              <br/>
              <FormControl className="margin-form">
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Nomor Handphone
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  onKeyPress={this.handleKeyPress}
                  id="phone"
                  type="text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br/>
              <FormControl className="margin-form">
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Alamat
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  onKeyPress={this.handleKeyPress}
                  id="address"
                  type="text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br/>
              <FormControl className="margin-form">
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Kata Sandi
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  onKeyPress={this.handleKeyPress}
                  id="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br/>
              <FormControl className="margin-form">
                <InputLabel
                  htmlFor="custom-css-input"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Konfirmasi Kata Sandi
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  onKeyPress={this.handleKeyPress}
                  type="password"
                />
              </FormControl>
            </div>
            <div>
             { authError ? <p style={{color: "white"}}>{authError}</p> : null }  
            </div>
          </div>

          <br />
          <div className="login-button">
            <MuiThemeProvider theme={theme}>
              <Button
                variant="extendedFab"
                color="primary"
                className={classes.margin}
                size="large"
                onClick={this.handleSubmit}
              >
                DAFTAR
              </Button>
            </MuiThemeProvider>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#999" }}>
              Sudah Punya Akun?{" "}
              <a href="/login" style={{ color: "white" }}>
                Sign In
              </a>
            </p>
          </div>

          <Button variant="fab" color="#00c43e" className={classes.absolute}>
            <ChatBubble className={classes.iconchat} />
          </Button>
        </div>
      </div>
    );
  }
}

Signuppage.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signuppage));
