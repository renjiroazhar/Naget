import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import Review from "./Review";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import checkIcon from "../../../../../assets/img/checkicon.jpg";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeft from "@material-ui/icons/ArrowBack";
import "./style/style.css";

import idLocale from "date-fns/locale/id";

import { stepLoginContext } from "../../../../../context/StepLoginProvider";

const themeMui = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiStepIcon: {
      root: {
        "&$completed": {
          color: "#fecb00ff"
        },
        "&$active": {
          color: "#fecb00ff"
        },
        fontSize: "xx-large"
      }
    },
    typography: {
      useNextVariants: true,
      suppressDeprecationWarnings: true
    },
    step: {
      "& $completed": {
        color: "lightgreen"
      },
      "& $active": {
        color: "pink"
      },
      "& $disabled": {
        color: "red"
      }
    },
    alternativeLabel: {},
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {},
    labelContainer: {
      "& $alternativeLabel": {
        marginTop: 0
      }
    }
  }
});

const styles = theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#559351"
  },
  stepIcon: {
    color: "red"
  },
  step: {
    "& $completed": {
      color: "lightgreen"
    },
    "& $active": {
      color: "pink"
    },
    "& $disabled": {
      color: "red"
    }
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  completedStep: {
    color: "red"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: 17,
    width: "100%",
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  button: {
    backgroundColor: "#fecb00ff",
    height: "46px",
    "&:hover": {
      backgroundColor: "#fecb00ff",
      borderColor: "#0062cc",
      color: "white"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#fecb00ff",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  buttonTwo: {
    backgroundColor: "#FFFFFF",
    borderColor: "#fecb00ff",
    height: "46px",
    color: "#fecb00ff",
    border: "1px solid #fecb00ff",
    "&:hover": {
      backgroundColor: "#fecb00ff",
      borderColor: "#0062cc",
      color: "white"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#fecb00ff",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  }
});

class Checkout extends React.Component {
  handleTypographyDep = () => {
    return (window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true);
  };

  componentDidMount() {
    this.handleTypographyDep();
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.context.state;
    const locale = idLocale;

    const steps = ["", "", ""];
    const {
      variant,
      count,
      username,
      phone,
      email,
      anchorEl,
      currentLocale,
      occupation,
      address,
      description,
      loading,
      allowSend,
      isInvalid,
      errorAll,
      errorsName,
      errorsPhone,
      errorsAddress,
      errorsEmail,
      errorsTitikEmail,
      errorsAtEmail,
      emailInvalid,
    } = this.context.state;
    const values = {
      variant,
      count,
      username,
      phone,
      allowSend,
      anchorEl,
      currentLocale,
      isInvalid,
      locale,
      errorsName,
      errorsPhone,
      errorsAddress,
      errorsEmail,
      errorsTitikEmail,
      errorsAtEmail,
      email,
      description,
      address,
      occupation,
      loading,

      errorAll,
      emailInvalid,
    };

    const getStepContent = step => {
      switch (step) {
        case 0:
          return (
            <FirstStep
              previousStep={this.context.handleBack}
              nextStep={this.context.handleNext}
              handleChange={this.context.handleChange}
              values={values}
            />
          );
        case 1:
          return (
            <SecondStep
              nextStep={this.context.handleSubmit}
              handleChange={this.context.handleChange}
              values={values}
              setSecondStepItem={this.context.setFirstStepItem}
            />

          );
        case 2:
          return (
            <Review
              allData={this.context.state}
              values={values}
              handleCreateOrder={this.context.handleCreateOrder}
              previousStep={this.context.handleBack}
              isLoading={this.context.isLoading}
              handleUpload={this.context.handleUpload}
            />
          );
        default:
          throw new Error("Unknown step");
      }
    };

    return (
      <div
        style={{
          width: "-webkit-fill-available",
          height: "100%",
          marginTop: "10px"
        }}
      >
        <React.Fragment>
          {activeStep === 0 ? (
            <div
              style={{ width: "100%", position: "fixed", top: 0, zIndex: 1000 }}
            >
              <AppBar
                style={{ width: "100%", backgroundColor: "#fecb00ff" }}
                position="static"
              >
                <Toolbar style={{ paddingLeft: 0 }}>
                  <IconButton
                    onClick={() => {
                      this.context.handleReturnToHome();
                    }}
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <ArrowLeft />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                  >
                    Variant List
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
          ) : activeStep === 3 ? (
            <div
              style={{ width: "100%", position: "fixed", top: 0, zIndex: 1000 }}
            >
              <AppBar
                style={{ width: "100%", backgroundColor: "#fecb00ff" }}
                position="static"
              >
                <Toolbar style={{ paddingLeft: 0 }}>
                  <IconButton
                    onClick={() => {
                      this.context.handleReturnToHome();
                    }}
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <ArrowLeft />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                  >
                    {activeStep === 1
                      ? "Fill Biodata's"
                      : activeStep === 2
                        ? "Detail"
                        : activeStep === 3
                          ? "Order Successful"
                          : ""}
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
          ) : (
                <div
                  style={{ width: "100%", position: "fixed", top: 0, zIndex: 1000 }}
                >
                  <AppBar
                    style={{ width: "100%", backgroundColor: "#fecb00ff" }}
                    position="static"
                  >
                    <Toolbar style={{ paddingLeft: 0 }}>
                      <IconButton
                        onClick={() => {
                          this.context.handleReturnToHome();
                        }}
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                      >
                        <ArrowLeft />
                      </IconButton>
                      <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                      >
                        {activeStep === 1
                          ? "Fill Biodata's"
                          : activeStep === 2
                            ? "Detail"
                            : activeStep === 3
                              ? "Order Successful"
                              : ""}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                </div>
              )}
          <CssBaseline />
          <br />
          <br />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              {activeStep === 3 || activeStep > 2 ? (
                ""
              ) : (
                  <MuiThemeProvider theme={themeMui}>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                      {steps.map(label => (
                        <Step key={label}>
                          <StepLabel
                            StepIconProps={{
                              classes: {
                                active: classes.stepIcon,
                                completed: classes.completedStep
                              }
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </MuiThemeProvider>
                )}

              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={checkIcon}
                        alt="check"
                        width="100"
                        height="100"
                      />
                    </div>
                    <Typography
                      variant="h5"
                      style={{
                        textAlign: "center",
                        color: "#757575",
                        justifyContent: "center"
                      }}
                      gutterBottom
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          marginRight: "5px",
                          color: "#757575",
                          marginTop: "10px"
                        }}
                      >
                        Thank You
                      </div>{" "}
                      {values.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{ textAlign: "center", color: "#757575" }}
                    >
                      For trusting us
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      style={{
                        textAlign: "center",
                        color: "#757575",
                        fontSize: "12px",
                        fontWeight: 600
                      }}
                    >
                      *Exclude shipping cost, outside Semarang area.
                    </Typography>

                    <div
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        width: "100%",
                        marginTop: "10%"
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.props.history.push("/");
                        }}
                        className={classes.buttonTwo}
                        style={{ width: "100%" }}
                      >
                        Done
                      </Button>
                    </div>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      {getStepContent(activeStep)}
                      <div>{activeStep === steps.length - 1 ? "" : ""}</div>
                    </React.Fragment>
                  )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      </div>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

Checkout.contextType = stepLoginContext;

const styledCheckout = withRouter(withStyles(styles)((Checkout)));

export { styledCheckout as Checkout };
