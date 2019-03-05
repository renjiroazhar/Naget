import React, { Component } from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import { signIn } from '../../../../../redux/actions/authActions';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

class Loginpage extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.login();
  };

  login = () => {
    const { email, password } = this.state;
    if (email === 'renjiroazhar@gmail.com' && password === 'admin') {
      localStorage.setItem('email', email);
      localStorage.setItem('name', 'admin');
    }
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { authError, redirect, classes } = this.props;
    return (
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div style={{ padding: 15 }}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: '100%',
                backgroundColor: '#fff',
                padding: '20px',
                marginTop: '60px'
              }}
            >
              <h3
                style={{
                  textAlign: 'center',
                  color: '#000'
                }}
              >
                Enter your registered Email to login
              </h3>
              <div>
                <FormControl
                  style={{ width: '100%' }}
                  onSubmit={this.handleSubmit}
                >
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
                    id="email"
                    type="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </FormControl>
              </div>
              <div className="group">
                <FormControl style={{ width: '100%', marginTop: '10px' }}>
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
                    classes={{
                      underline: classes.cssUnderline
                    }}
                    id="password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </FormControl>
              </div>
              <center>
                <Button
                  type="button"
                  className={classes.cssRoot}
                  onClick={this.handleSubmit}
                >
                  {' '}
                  <span> Login </span>
                  <div className="ripples buttonRipples">
                    <span className="ripplesCircle" />
                  </div>
                </Button>{' '}
              </center>
              <div>
                {authError ? (
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'red'
                    }}
                  >
                    {authError}
                  </p>
                ) : null}
              </div>
              <div>
                <p
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    marginTop: '20px'
                  }}
                >
                  <Link
                    to="/forgot_password"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
              <div>
                <p
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    padding: 0,
                    marginTop: '30px'
                  }}
                >
                  Don't have account?{' '}
                  <Link
                    to="/sign_up"
                    style={{ color: '#fecb00ff', textDecoration: 'none' }}
                  >
                    Register now!
                  </Link>
                </p>
              </div>
            </div>
            {redirect ? <Redirect to="/" /> : null}
          </Paper>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: 19
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: 0,
    width: '100%',
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  menu: {
    width: 200
  },
  absolute: {
    color: '#fecb00ff',
    backgroundColor: '#fecb00ff',
    position: 'fixed',
    right: '0px',
    bottom: '0px',
    marginBottom: '40px',
    marginRight: '24px'
  },
  margin: {
    maxWidth: '380px',
    width: '90%',
    borderRadius: 0,
    fontWeight: 400,
    color: 'white',
    backgroundColor: '#fecb00ff',
    textDecoration: 'none'
  },
  marginForm: {
    maxWidth: '350px',
    width: '100%',
    fontWeight: 400,
    color: 'white',
    textDecoration: 'none'
  },
  cssRoot: {
    color: '#FFFFFF',
    backgroundColor: '#fecb00ff',
    width: '100%',
    height: '40px',
    marginTop: '10%',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#fecb00ff'
    }
  },
  iconchat: {
    color: '#fff',
    '&:hover': {
      color: '#fecb00ff'
    }
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    maxWidth: '350px',
    width: '100%',
    fontSize: 16,
    fontWeight: 400,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: 'white',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      color: 'white'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf'
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    }
  },
  snackbar: {
    position: 'absolute',
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5
  },
  snackbarContent: {
    width: 360
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  },
  cssLabel: {
    color: '#999',
    '&$cssFocused': {
      color: '#000000'
    }
  },
  cssFocused: {},
  cssUnderline: {
    width: '100%',
    borderColor: '#fff',
    color: '#000',
    borderBottomColor: '#000000',
    '&:before': {
      borderBottomColor: '#000000'
    },
    '&:after': {
      borderBottomColor: '#000000'
    },
    '&:hover': {
      borderBottomColor: '#000000'
    }
  }
});

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    redirect: state.auth.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

Loginpage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Loginpage));
