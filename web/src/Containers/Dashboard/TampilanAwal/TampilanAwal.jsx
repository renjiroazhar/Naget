import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom';
import Header from './Header';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  demo: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius : 0,
    paddingBottom :0,
    borderBottom : '1px solid #999999',
    justifyContent: 'center',
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
});


class TampilanAwal extends Component {

  state = {
    redirect : false
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{marginTop: "170px"}}>
      <Header />
      <React.Fragment>
        <CssBaseline />
{/* Second Card */}
          <center> 
            <div className={classes.demo} style={{borderTop: '1px solid #999999'}}>
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
{/* End Of Second Card */}

{/* Third Card */}
          <center> 
            <div className={classes.demo} style={{borderBottom: '1px solid #999999'}}>
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
             {this.state.redirect ? (<Redirect to="/" />):("")} 
  </React.Fragment>
  </div>
    );
  }
}


TampilanAwal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TampilanAwal);