import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { signOut } from "../../../../store/actions/authActions";
import EditProfil from './Dialog/EditProfil';
import GantiPassword from './Dialog/GantiPassword';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "65%",
    borderRadius: 0,
    color: "white",
    backgroundColor: "#e74c3c",
    textDecoration: "none",
    fontWeight: "bold"
  },
  demo: {
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 0,
    justifyContent: "center",
    marginBottom: "3px"
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  paper: {
    paddingBottom: 50
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  card: {
    width: "100%",
    marginBottom: "20px",
    border: 0,
    borderRadius: 0
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  icon1: {
    color: "#00c43e"
  },
  icon2: {
    color: "yellow"
  },
  list: {
    backgroundColor: "#ffff",
    margin: "0 0 20px 0"
  },
  pos: {
    marginBottom: 12
  },
  textDeco: {
    textDecoration: "none"
  },
  editText: {
    color: "#1abc9c"
  }
});

class AccountEdit extends Component {
  state = {
    redirect: false
  };

  logout = () => {
    this.props.signOut();
    sessionStorage.clear();
    this.setState({
      redirect: true
    });
  };

  render() {

    return (
      <div>
        {/* First Card */}
        <div style={{ marginTop: "70px" }}>
          <center>
           <EditProfil/>
              <Divider />
            <GantiPassword/>
          </center>
        </div>
        {/* End Of First Card */}
      </div>
    );
  }
}

AccountEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AccountEdit));
