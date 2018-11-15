import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom';

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
    borderRadius : 0,
    color: "white",
    backgroundColor: "#e74c3c",
    textDecoration: "none",
    fontWeight : 'bold'
  },
  demo: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    borderRadius : '4px',
    paddingBottom :0,
    borderBottom : '2px solid #999',
    justifyContent: 'center',
    marginBottom : '3px'
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
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
    width: "90%",
    border : 0,
    borderBottom : '2px solid #999',
    justifyContent: 'center',
    marginBottom : '3px'
  },
  card2: {
    width: "90%",
    border : 0,
    borderBottom : '2px solid #999',
    justifyContent: 'center',
    marginBottom : '3px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
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
    redirect : false
  }

  logout = () => {
  this.setState({
    redirect : true
  });
  this.props.FunctionLogout();
}

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
{/* First Card */}
         <div style={{marginTop : "75px"}}>
          <center>
            <Card className={classes.card} style={{paddingBottom: '35px'}}>
              <CardContent>
                <div>
                  <Typography style={{float:'right',fontWeight: 'bold', textAlign: "right", color: '#1abc9c'}} component="p">
                    Edit
                  </Typography>
                </div>
              </CardContent>

              <CardContent>
                <div>
                  <Typography style={{float: 'left'}} component="p">
                    Username
                  </Typography>
                  
                  <Typography style={{float:'right', textAlign: "right", color: '#777777'}} component="p">
                    Fulan Bin Fulan
                  </Typography>
                </div>
              </CardContent>
 
              <CardContent>
                <div>
                  <Typography style={{float: 'left'}} component="p">
                    Email
                  </Typography>
                  
                  <Typography style={{float:'right', textAlign: "right", color: '#777777'}} component="p">
                    fulanbinfulan@gmail.com
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </center>
        </div>
{/* End Of First Card */}

{/* Second Card */}
          <center> 
            <div className={classes.demo}>
              <List>     
                <ListItem>
                  <ListItemText primary="FAQ" />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Add">
                        <Add style={{fontSize: '40px', color: '#1abc9c'}}/>                     
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </center>
{/* End Of Second Card */}

{/* Third Card */}
          <center> 
            <div className={classes.demo}>
              <List>     
                <ListItem>
                  <ListItemText primary="Rate GMB" />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Add">
                        <Add style={{fontSize: '40px', color: '#1abc9c'}}/>              
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
              </List>
            </div>
          </center>
{/* End Of Third Card */}    

<br/>
<br/>
<br/>

            <div className="login-button">
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
             {this.state.redirect ? (<Redirect to="/" />):("")} 
  </React.Fragment>
    );
  }
}


AccountContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContainer);