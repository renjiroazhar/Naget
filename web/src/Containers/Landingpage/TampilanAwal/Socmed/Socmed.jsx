import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Facebook from '../images/facebook.png';
import Twitter from '../images/twitter.png';
import Whatsapp from '../images/whatsapp.png';
import Gmail from '../images/gmail.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 50,
    width: 50
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Socmed extends React.Component {
  state = {
    spacing: '40'
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    return (
     <div style={{overflow: 'hidden', margin: 0}}>
     <Grid container className={classes.root} spacing={40}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            
              <Grid key={0} item>
                <img src={Facebook} alt='' className={classes.paper} />
              </Grid>
              
              <Grid key={1} item>
                <img src={Twitter} alt='' className={classes.paper} />
              </Grid>
              
              <Grid key={2} item>
                <img src={Whatsapp} alt='' className={classes.paper} />
              </Grid>
              
              <Grid key={3} item>
                <img src={Gmail} alt='' className={classes.paper} />
              </Grid>
           
          </Grid>
        </Grid>
    </Grid>
    </div>
    );
  }
}

Socmed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Socmed);