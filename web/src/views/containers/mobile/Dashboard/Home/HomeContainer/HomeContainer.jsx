import React, { Component } from 'react';
import './style/home.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { editProfile } from '../../../../../../redux/actions/profileActions';
import Logo from '../../../../../../assets/img/svg/logonaget6.svg';
import Mascott from '../../../../../../assets/img/svg/logonaget5.svg';
import Promo from '../../../../../../assets/img/svg/promo.svg';
import LazyLoad from 'react-lazy-load';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  appBar: {
    position: 'fixed',
    backgroundColor: '#fecb00ff'
  },
  flex: {
    flex: 1
  },

  form: {
    textAlign: 'center'
  },
  dense: {
    marginTop: 19
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
    width: '90%',
    maxWidth: '380px',
    minWidth: '300px',
    backgroundColor: '#fecb00ff'
  },
  marginForm: {
    maxWidth: '350px',
    width: '100%',
    fontWeight: 400,
    color: 'white',
    textDecoration: 'none'
  },
  cssRoot: {
    backgroundColor: '#fecb00ff',
    width: '250px',
    height: '55px',
    marginBottom: '5%',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#fecb000f'
    }
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
  image: {
    margin: '20px'
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
  }
});

class HomeContainer extends Component {
  state = {
    open: false,
    name: '',
    address: '',
    phone: '',
    screenWidth: window.innerWidth
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth
    });
  };

  handleForm = () => {
    this.props.history.push('/form_login');
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { classes } = this.props;
    const { screenWidth } = this.state;
    const gridPicture = () => {
      if (screenWidth > 350) {
        return (
          <div style={{ textAlign: 'center', marginTop: '1%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              {localStorage.getItem('email') ? (
                <center>
                  <Button
                    className={classes.cssRoot}
                    onClick={this.handleForm}
                    size="small"
                    aria-label="Order Now"
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      }}
                    >
                      Order Now
                    </p>
                  </Button>
                </center>
              ) : (
                <center>
                  <Button
                    className={classes.cssRoot}
                    onClick={() => this.props.history.push('/login')}
                    size="small"
                    aria-label="Order Now"
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      }}
                    >
                      Order Now
                    </p>
                  </Button>
                </center>
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <LazyLoad
                placeholder={<div>Loading</div>}
                debounce={true}
                height="40"
                width="141"
              >
                <img
                  src={Promo}
                  srcSet={Promo}
                  width="200"
                  height="200"
                  alt="Promo"
                  retina_logo_url=""
                />
              </LazyLoad>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: 'center', marginTop: '1%' }}>
            <center>
              <div
                style={{
                  textAlign: 'center',
                  width: '	100%',
                  display: 'flex',
                  justifyContent: 'space-evenly'
                }}
              >
                <div>
                  <Button
                    className={classes.cssRoot}
                    onClick={this.handleForm}
                    size="small"
                    aria-label="Order Now"
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      }}
                    >
                      Order Now
                    </p>
                  </Button>
                </div>
              </div>
            </center>
            <div style={{ textAlign: 'center' }}>
              <LazyLoad
                placeholder={<div>Loading</div>}
                debounce={true}
                height="40"
                width="141"
              >
                <img
                  src={Promo}
                  srcSet={Promo}
                  width="200"
                  height="200"
                  alt="Promo"
                  retina_logo_url=""
                />
              </LazyLoad>
            </div>
          </div>
        );
      }
    };
    return (
      <div
        style={{
          backgroundColor: '#fff',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <LazyLoad
            placeholder={<div>Loading</div>}
            debounce={true}
            height="40"
            width="141"
          >
            <img
              src={Logo}
              srcSet={Logo}
              width="141"
              height="40"
              alt="Naget Logo"
              retina_logo_url=""
              className={classes.image}
            />
          </LazyLoad>
        </div>
        <div style={{ textAlign: 'center' }}>
          <LazyLoad
            placeholder={<div>Loading</div>}
            debounce={true}
            height="40"
            width="141"
          >
            <img
              src={Mascott}
              srcSet={Mascott}
              width="170"
              height="170"
              alt="Mascott"
              retina_logo_url=""
            />
          </LazyLoad>
        </div>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '5px'
          }}
        >
          <br />
          {gridPicture()}
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const id = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    userdata: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (userdata, id) => dispatch(editProfile(userdata, id))
  };
};

const composingHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(HomeContainer)));

export { composingHomeContainer as HomeContainer };
