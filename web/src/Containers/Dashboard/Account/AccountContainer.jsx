import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChatBubble from '@material-ui/icons/Chat';
import Stars from '@material-ui/icons/Stars';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "65%",
    borderRadius: 0,
    color: "white",
    backgroundColor: "#e74c3c",
    textDecoration: "none",
    fontWeight: 'bold'
  },
  demo: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 0,
    justifyContent: 'center',
    marginBottom: '3px'
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  paper: {
    paddingBottom: 50,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  card: {
    width: "100%",
    marginBottom: '20px',
    border: 0,
    borderRadius: 0,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  icon1: {
    color: "#00c43e",
  },
  icon2: {
    color: "yellow",
  },
  list: {
    backgroundColor: "#ffff",
    margin: "0 0 20px 0",
  },
  pos: {
    marginBottom: 12,
  },
  textDeco: {
    textDecoration: "none",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: {
    useNextVariants: true
  }
});


class AccountContainer extends Component {

  state = {
    redirect: false
  }

  logout = () => {
    this.props.signOut();
    sessionStorage.clear();
    this.setState({
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* First Card */}
        <div style={{ marginTop: "70px" }}>
          <center>
            
            <List className={classes.list} style={{ paddingBottom: '20px' }}>
              <ListItem>
                <div>
                  <ListItemText style={{ float: 'right', cursor: 'pointer', fontWeight: 'bold', textAlign: "right", color: '#1abc9c' }} component="p">
                    Edit
                  </ListItemText>
                </div>
              </ListItem>

              <ListItem>
                <div>
                  <ListItemText style={{ float: 'left' }} component="p">
                    Nama Lengkap
                  </ListItemText>

                  <ListItemText style={{ float: 'right', textAlign: "right", color: '#777777' }} component="p">
                    Fulan Bin Fulan
                  </ListItemText>
                </div>
              </ListItem>

              <ListItem>
                <div>
                  <ListItemText style={{ float: 'left' }} component="p">
                    Email
                  </ListItemText>

                  <ListItemText style={{ float: 'right', textAlign: "right", color: '#777777' }} component="p">
                    fulanbinfulan@gmail.com
                  </ListItemText>
                </div>
              </ListItem>
            </List>
          </center>
        </div>
        {/* End Of First Card */}

        {/* Second Card */}
        <List className={classes.list}>
          <Link to="/help" className={classes.textDeco} >
            <ListItem>
              <ChatBubble className={classes.icon1} />
              <ListItemText primary="Help" />
            </ListItem>
          </Link>
          <li>
            <Divider inset />
          </li>
          <ListItem>
            <Stars className={classes.icon2} />
            <ListItemText primary="Rate Moretrash" />
          </ListItem>
        </List>
        {/* End Of First Card */}

        <br />
        <br />
        <br />

        <div className="logout-button" style={{justifyContent: 'center',textAlign: 'center'}}>
          <MuiThemeProvider theme={theme}>
            <Button
              variant="extendedFab"
              color="primary"
              className={classes.margin}
              size="large"
              onClick={this.logout}
            >
              Keluar
                </Button>
          </MuiThemeProvider>
        </div>
        {this.state.redirect ? (<Redirect to="/" />) : ("")}
        </div>
    );
  }
}


AccountContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(AccountContainer));
