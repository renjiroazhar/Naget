import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import TextField from "@material-ui/core/TextField";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import avatar from "assets/img/faces/adminsetting.png";
//firebase
// import firebase from 'firebase'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// Action
import { editProfileAdmin} from '../../../redux/actions/profileActions'
import {connect } from 'react-redux';
import firebase from 'firebase'

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
  },
  list: {
      paddingTop: 0,
      paddingBottom: 0
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

class ProfileSetting extends Component {
  state = {
    open: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    passwordConfirmation: "",

    editName: false,
    editPhone: false,
    editAddress:false
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

  editNameFunction = () => {
    this.setState({
        editName: true
    })
  }
  editPhoneFunction = () => {
    this.setState({
        editPhone: true
    })
  }
  editAddressFunction = () => {
    this.setState({
        editAddress: true
    })
  }

  editProfile = ()=> {
    const {auth} = this.props
    const idAdmin = auth.uid
    const {name, address, phone} = this.state;
    let data = {
          name,
          address,
          phone
      }
      this.props.editProfileAdmin(data, idAdmin)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.editProfile() 
    this.setState({
        editAddress: false,
        editName: false,
        editPhone: false
    })
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  async componentDidMount() {
    const { auth } = this.props;
    const ref = firebase
        .firestore()
        .collection('admins')
        .doc(auth.uid);
    try {
        const getData = await ref.onSnapshot(doc => {
            var dataSnapshot = doc.data();
            if (dataSnapshot !== null || dataSnapshot !== []) {
                this.setState({
                    name: dataSnapshot.name,
                    address: dataSnapshot.address,
                    phone: dataSnapshot.phone,
                    email: auth.email
                });
            } else {
                console.log('Kosong? , Astaughfirullah');
            }
        });
        return getData;
    } catch (error) {
        console.log(error);
    }
}

  render() {
    const { 
      name,
      email,
      phone,
      address,
    
      editName,
      editPhone,
      editAddress
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Profile Setting</h4>
                <p className={classes.cardCategoryWhite}>
                  Change Information about your Account
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {editName ? (
                        <TextField
                        autoFocus
                        margin="dense"
                        onChange={this.handleChange}
                        id="name"
                        label="Name"
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        type="text"
                        value={name}
                        required
                        fullWidth
                      />
                    ):(
                        <List className={classes.list} onClick={this.handleClickOpen}>
                        <ListItem button   style={{paddingRight: 0,paddingLeft: 0}}  onClick={this.handleClickOpen}>
                            <ListItemText
                            style={{ float: 'left' }}
                            secondary="Name"
                            />
                           
                        </ListItem>
                        <ListItem style={{paddingRight: 0,paddingLeft: 0, paddingTop: 0}}>
                            <ListItemText
                            style={{ float: 'left' }}
                            primary={name}
                            />
                          <IconButton onClick={()=>{this.editNameFunction()}}>
                           <CreateIcon style={{color: '#b7b7b7'}}/>
                        </IconButton>
                        </ListItem>
                    </List>
    
                    )}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                                          <List className={classes.list} onClick={this.handleClickOpen}>
                        <ListItem button  style={{paddingRight: 0,paddingLeft: 0}}  onClick={this.handleClickOpen}>
                            <ListItemText
                            style={{ float: 'left' }}
                            secondary="Email"
                            />
                           
                        </ListItem>
                        <ListItem style={{paddingRight: 0,paddingLeft: 0, paddingTop: 0}}>
                            <ListItemText
                            style={{ float: 'left' }}
                            primary={email}
                            />
                          <IconButton>
                           <CreateIcon style={{color: '#b7b7b7'}}/>
                        </IconButton>
                        </ListItem>
                    </List>
    
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  {editAddress ? (
                        <TextField
                        autoFocus
                        margin="dense"
                        onChange={this.handleChange}
                        id="address"
                        label="Address"
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        type="text"
                        value={address}
                        required
                        fullWidth
                      />
                    ):(
                        <List className={classes.list} onClick={this.handleClickOpen}>
                        <ListItem button  style={{paddingRight: 0,paddingLeft: 0}}  onClick={this.handleClickOpen}>
                            <ListItemText
                            style={{ float: 'left' }}
                            secondary="Address"
                            />
                           
                        </ListItem>
                        <ListItem style={{paddingRight: 0,paddingLeft: 0, paddingTop: 0}}>
                            <ListItemText
                            style={{ float: 'left' }}
                            primary={address}
                            />
                          <IconButton  onClick={()=> this.editAddressFunction()}>
                           <CreateIcon style={{color: '#b7b7b7'}}/>
                        </IconButton>
                        </ListItem>
                    </List>
    
                    )}

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  {editPhone ? (
                        <TextField
                        autoFocus
                        margin="dense"
                        onChange={this.handleChange}
                        id="phone"
                        label="Phone"
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        type="tel"
                        value={phone}
                        required
                        fullWidth
                      />
                    ):(
                        <List className={classes.list} onClick={this.handleClickOpen}>
                        <ListItem button  style={{paddingRight: 0,paddingLeft: 0}}  onClick={this.handleClickOpen}>
                            <ListItemText
                            style={{ float: 'left' }}
                            secondary="Phone"
                            />
                           
                        </ListItem>
                        <ListItem style={{paddingRight: 0,paddingLeft: 0, paddingTop: 0}}>
                            <ListItemText
                            style={{ float: 'left' }}
                            primary={phone}
                            />
                          <IconButton  onClick={()=> this.editPhoneFunction()}>
                           <CreateIcon style={{color: '#b7b7b7'}}/>
                        </IconButton>
                        </ListItem>
                    </List>
    
                    )}

                  </GridItem>
                </GridContainer>
                </CardBody>
              <CardFooter>
                <Button color="success"  onClick={this.handleSubmit}>
                  Save Changes
                </Button>
              </CardFooter>
              
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Admin</h6>
              <h4 className={classes.cardTitle}>{name}</h4>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>

            </CardBody>
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
            message="Add Admin Success, Check your Email to Activate Your Account"
          />
        </Snackbar>
      </div>
    );
  }
}

ProfileSetting.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(state);
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfileAdmin: (admindata, id) => dispatch(editProfileAdmin(admindata, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileSetting));
