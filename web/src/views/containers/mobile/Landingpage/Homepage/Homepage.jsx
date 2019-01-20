import React, { Component } from "react";
import "./style/home.css";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Logo from "../../../../../assets/img/svg/logonaget4.svg";
import Naget from "../../../../../assets/img/svg/logo.svg";
import TooltipButton from "../../../../components/TooltipButton";

const styles = theme => ({
  cssRoot: {
    color: "#ffffff",
    backgroundColor: "#fecb00ff",
    width: "100%",
    maxWidth: "300px",
    height: "",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "#fecb00ff"
    }
  }
});

class Homepage extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleTypographyDep = () => {
    return (window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true);
  };

  componentDidMount() {
    this.handleTypographyDep();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="home">
        <div className="container">
          <img
            src={Logo}
            srcSet={Logo}
            width="200"
            height="50"
            alt="Naget Logo"
            retina_logo_url=""
            className="naget-logo"
          />

          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={Naget}
                srcSet={Naget}
                width="200"
                height="220"
                alt="Naget Logo"
                retina_logo_url=""
              />
            </div>
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.cssRoot}
            onClick={() => this.props.history.push("/form")}
            size="large"
          >
            Order Now
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.cssRoot}
            onClick={() => this.props.history.push("/login")}
            size="large"
          >
            Login
          </Button>
        </div>
        <div>
          <TooltipButton />
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Homepage));
