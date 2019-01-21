import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { connect } from "react-redux";
import { signOut } from "../../../../../../redux/actions/authActions";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToApp from "@material-ui/icons/ExitToAppOutlined";
import { withRouter } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const styles = theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#16a085"
  },
  flex: {
    flex: 1
  },
  cssLabel: {
    color: "#999",
    "&$cssFocused": {
      color: "#000000"
    }
  },
  cssFocused: {},
  cssUnderline: {
    width: "100%",
    borderColor: "#fff",
    color: "#000",
    borderBottomColor: "#000000",
    "&:before": {
      borderBottomColor: "#000000"
    },
    "&:after": {
      borderBottomColor: "#000000"
    },
    "&:hover": {
      borderBottomColor: "#000000"
    }
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "100%",
    fontWeight: 400,
    color: "white",
    backgroundColor: "#00c43e",
    textDecoration: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#f7f7f7",
      color: "#00c43e"
    }
  },
  form: {
    textAlign: "center"
  }
});

class Logout extends React.Component {
  state = {
    open: false,
    currentPassword: "",
    newPassword: "",
    isOpen: false
  };

  logout = () => {
    this.props.signOut();
    this.props.history.push("/");
  };

  onChangeTab = selectedTab => {
    this.setState({
      selectedTab: selectedTab
    });
  };

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ backgroundColor: "white" }}>
        <List className={classes.list} onClick={this.handleOpen}>
          <ListItem button onClick={this.handleOpen}>
            <ListItemIcon>
              <ExitToApp style={{ fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemSecondaryAction>
              <ListItemText
                style={{ fontSize: "24px" }}
                inset
                primary="Keluar"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Dialog
          isOpen={this.state.isOpen}
          onCancel={this.handleClose}
          cancelable
        >
          <div className="alert-dialog-title">Logout</div>
          <div className="alert-dialog-content">You Sure?</div>

          <Divider />
          <Button
            varian="contained"
            onClick={this.logout}
            className="alert-dialog-button"
          >
            Yes
          </Button>
          <Button
            varian="contained"
            onClick={this.handleClose}
            className="alert-dialog-button"
          >
            No
          </Button>
        </Dialog>
      </div>
    );
  }
}

Logout.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Logout)));
