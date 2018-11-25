import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ArrowRightSharp from "@material-ui/icons/ArrowRightSharp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import green from "@material-ui/core/colors/green";
import './style/style.css'

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
    maxWidth: "345px",
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
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: {
    useNextVariants: true
  },
  eye: {
    cursor: "pointer"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GantiPassword extends React.Component {
  state = {
    open: false,
    password: "",
    passwordTwo: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    if (this.state.passwordTwo !== this.state.password) {
      alert("Error, Confirmation Password must be same");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.list} style={{ paddingBottom: "20px" }}>
          <ListItem button onClick={this.handleClickOpen}>
            <ListItemText style={{ float: "left" }} component="p">
              Ganti Password
            </ListItemText>
            <ListItemSecondaryAction>
              <ListItemIcon>
                <ArrowRightSharp />
              </ListItemIcon>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Ganti Password
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <FormControl className="margin-form">
              <InputLabel
                htmlFor="custom-css-input"
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
              >
                Password Baru
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline
                }}
                onKeyPress={this.handleKeyPress}
                id="password"
                type="password"
                onChange={this.handleChange}
              />
            </FormControl>
            <br />

            <FormControl className="margin-form">
              <InputLabel
                htmlFor="custom-css-input"
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
              >
                Konfirmasi Password Baru
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline
                }}
                onKeyPress={this.handleKeyPress}
                id="passwordTwo"
                type="password"
                onChange={this.handleChange}
              />
            </FormControl>
           
            <br />
            <br />
            <br />
            <div className="login-button">
              <MuiThemeProvider theme={theme}>
                <Button
                  variant="extendedFab"
                  color="primary"
                  className={classes.margin}
                  size="large"
                  onClick={this.handleSubmit}
                >
                  Ganti Password
                </Button>
              </MuiThemeProvider>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

GantiPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GantiPassword);
