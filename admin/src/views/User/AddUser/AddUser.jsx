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
//firebase
import {secondaryApp} from "../../../services/firebaseConfig";
import firebase from 'firebase'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success: CheckCircleIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
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
        </IconButton>,
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
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class AddUser extends Component {
  state = {
    open: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    passwordConfirmation: "",

    isValid: true,
    nameIsEmpty: false,
    phoneIsEmpty: false,
    passwordIsEmpty: false,
    addressIsEmpty: false,
    emailIsEmpty: false,
    allEmpty: false,

    errorMessage: null
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
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
    const { name, phone, address, email, password } = this.state;
    if (
      email.length === 0 &&
      name.length === 0 &&
      phone.length === 0 &&
      address.length === 0 &&
      password.length === 0
    ) {
      this.setState({
        allEmpty: true
      });
      console.log("KOSONG ?");
    }
    if (name.length < 0 || name === "") {
      console.log("Name Cannot Be Empty");
      this.setState({
        nameIsEmpty: true
      });
    }
    if (address.length < 0 || address === "") {
      console.log("Address Cannot Be Empty");
      this.setState({
        addressIsEmpty: true
      });
    }
    if (phone.length < 0 || phone === "") {
      console.log("Phone Cannot Be Empty");
      this.setState({
        phoneIsEmpty: true
      });
    }
    if (email.length < 0 || email === "") {
      console.log("Email Cannot Be Empty");
      this.setState({
        emailIsEmpty: true
      });
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
        allEmpty: false
      });
    }, 5000);
    this.signUpFunction();
  };

  signUpFunction = () => {
    const { name, phone, address, email, password } = this.state;
    const firestore = firebase.firestore();
   secondaryApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        secondaryApp.auth().signOut();
        
      firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            name: name,
            phone: phone,
            address: address
          });
      })
      .then(() => {
        console.log("Add User Success");
        this.setState({
          errorMessage: null,
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          passwordConfirmation: "",

        });
        this.handleClick()
        
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          errorMessage: err.message
        });

        setTimeout(() => {
          this.setState({
            errorMessage: null
          });
        }, 5000);
      });
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
      errorMessage,  
      nameIsEmpty,
      phoneIsEmpty,
      passwordIsEmpty,
      addressIsEmpty,
      emailIsEmpty,
      name,
      email,
      phone,
      address,
      password,
      passwordConfirmation, 
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Add User</h4>
                <p className={classes.cardCategoryWhite}>
                  Add New User to become a Member
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Full Name"
                      type="text"
                      style={{ marginBottom: "10px" }}
                      fullWidth
                      variant="outlined"
                      required
                      value={name}
                      onChange={this.handleChange}
                    />
                    {!allEmpty ? (
                      !nameIsEmpty ? (''):(
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      variant="outlined"
                      label="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={this.handleChange}
                      style={{ marginBottom: "10px" }}
                      fullWidth
                    />
                                        {!allEmpty ? (
                      !emailIsEmpty ? (''):(
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

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      required
                      variant="outlined"
                      onChange={this.handleChange}
                      label="Phone"
                      value={phone}
                      style={{ textDecoration: "none", marginBottom: "10px" }}
                      type="tel"
                      fullWidth
                    />
                                        {!allEmpty ? (
                      !phoneIsEmpty ? (''):(
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

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="dense"
                      id="address"
                      label="Address"
                      type="text"
                      fullWidth
                      required
                      value={address}
                      style={{ marginBottom: "10px" }}
                      onChange={this.handleChange}
                    />
                                        {!allEmpty ? (
                      !addressIsEmpty ? (''):(
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
                      !passwordIsEmpty ? (''):(
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
                    <p style={{ fontWeight: "bold", color: "red", textAlign: 'center' }}>
                      {errorMessage}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </CardBody>
              <CardFooter>
                <Button color="success"  onClick={this.handleSubmit}>
                  Add User
                </Button>
              </CardFooter>
              
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={7000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Add User Success"
          />
        </Snackbar>
      </div>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);
