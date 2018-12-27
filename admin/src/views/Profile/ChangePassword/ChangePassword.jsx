import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { connect } from "react-redux";
import { changePassword } from "../../../redux/actions/profileActions";

const variantIcon = {
  success: CheckCircleIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const styles = {
  formControl: {
    width: "100%"
  },
  helperText: {
    color: "red"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class ChangePassword extends Component {
  state = {
    open: false,

    oldPassword: "",
    password: "",
    passwordConfirmation: "",

    isValid: true,
    nameIsEmpty: false,
    phoneIsEmpty: false,
    passwordIsEmpty: false,
    addressIsEmpty: false,
    emailIsEmpty: false,
    allEmpty: false,

    errorMessage: null,
    lessThanSix: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleChangePassword = e => {
    const { id, value } = e.target;
    this.setState(
      {
        [id]: value
      },
      () => {
        if (this.state.password === this.state.passwordConfirmation) {
          console.log("success");
          this.setState({
            isValid: true
          });
        } else {
          console.log("error");
          this.setState({
            isValid: false
          });
        }
      }
    );
  };
  validateData = () => {
    const { oldPassword, passwordConfirmation, password } = this.state;
    if (
      oldPassword.length === 0 &&
      passwordConfirmation.length === 0 &&
      password.length === 0
    ) {
      this.setState({
        allEmpty: true
      });
      console.log("KOSONG ?");
    }
    if (password.length < 6) {
      this.setState({
        lessThanSix: true
      });
      console.log("KOSONG ?");
    }
    if (password.length < 0 || password === "") {
      console.log("Password Cannot Be Empty");
      this.setState({
        passwordIsEmpty: true
      });
    }

    setTimeout(() => {
      this.setState({
        nameIsEmpty: false,
        phoneIsEmpty: false,
        passwordIsEmpty: false,
        addressIsEmpty: false,
        emailIsEmpty: false,
        allEmpty: false,
        lessThanSix: false
      });
    }, 5000);
    this.props.changePassword(oldPassword, password);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.validateData();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const {
      isValid,
      allEmpty,
      lessThanSix,
      passwordIsEmpty,
      password,
      passwordConfirmation,
      oldPassword
    } = this.state;
    const { classes, errorMessage, succesMessage } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Change Password</h4>
                <p className={classes.cardCategoryWhite}>Change Current Password with New Password</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl style={styles.formControl}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        onChange={this.handleChange}
                        label="Password Saat Ini"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        required
                        value={oldPassword}
                        type="password"
                        fullWidth
                      />
                      {!allEmpty ? (
                        !passwordIsEmpty ? (
                          ""
                        ) : (
                          <FormHelperText
                            variant="outlined"
                            style={styles.helperText}
                          >
                            Required
                          </FormHelperText>
                        )
                      ) : (
                        <FormHelperText
                          variant="outlined"
                          style={styles.helperText}
                        >
                          Required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl style={styles.formControl}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        onChange={this.handleChangePassword}
                        label="Password"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        required
                        value={password}
                        type="password"
                        fullWidth
                      />
                      {!allEmpty ? (
                        !passwordIsEmpty ? (
                          lessThanSix ? (
                            <FormHelperText
                              variant="outlined"
                              style={styles.helperText}
                            >
                              Password Cannot less than 6
                            </FormHelperText>
                          ) : (
                            ""
                          )
                        ) : (
                          <FormHelperText
                            variant="outlined"
                            style={styles.helperText}
                          >
                            Required
                          </FormHelperText>
                        )
                      ) : (
                        <FormHelperText
                          variant="outlined"
                          style={styles.helperText}
                        >
                          Required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl style={styles.formControl}>
                      <TextField
                        autoFocus
                        margin="dense"
                        onChange={this.handleChangePassword}
                        id="passwordConfirmation"
                        label="Confirm Password"
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        type="password"
                        value={passwordConfirmation}
                        required
                        fullWidth
                      />
                      {!isValid ? (
                        <FormHelperText
                          variant="outlined"
                          style={styles.helperText}
                        >
                          Password And Confirmation Password must be same
                        </FormHelperText>
                      ) : !allEmpty ? (
                        ""
                      ) : (
                        <FormHelperText
                          variant="outlined"
                          style={styles.helperText}
                        >
                          Required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                {errorMessage ? (
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        textAlign: "center"
                      }}
                    >
                      {errorMessage}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {succesMessage ? (
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#66bb6a",
                        textAlign: "center"
                      }}
                    >
                      {succesMessage}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </CardBody>
              <CardFooter>
                <Button color="success" onClick={this.handleSubmit}>
                  Add Admin
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={7000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Add Admin Success, Check your Email to Activate Your Account"
          />
        </Snackbar>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (currentPassword, newPassword) =>
      dispatch(changePassword(currentPassword, newPassword))
  };
};

const mapStateToProps = state => {
  return {
    errorMessage: state.userprofile.changePassErrMessage,
    succesMessage: state.userprofile.succesMessage
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChangePassword));
