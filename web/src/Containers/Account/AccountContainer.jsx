import React, { Component } from 'react';
import {
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    width: '100%',
    textAlign: "left",
    backgroundColor: "#fff",
    height: "100%",
    margin: "15px",
    padding: "15px"
  },
};


class AccountContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <div style={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" aria-label="Add">
              Edit <AddIcon />
            </Button>
          </div>
          <h5>Username : </h5>
          <h5>Email : </h5>
          <h5>Phone : </h5>
        </div>

        <div className={classes.container}>
          <h5>FAQ <AddIcon /></h5>
        </div>

        <div className={classes.container}>
          <h5>Rate Gambar</h5>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" style={{ height: '20px', width: '150px' }}>
              Logout
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

AccountContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountContainer);
