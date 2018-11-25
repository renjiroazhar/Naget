import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import Review from "./Review";
import ThirdStep from "./ThirdStep";
import Header from "../../../Components/Header";

const styles = theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#559351"
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
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  button: {
    marginTop: theme.spacing.unit * -7
  }
});

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    database: [],
    data: []
  };

  addDataFormOtherComponent = value => {
    const database = this.state.database;
    database.push(value);
    console.log(value);
    console.log(this.state.database);
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    console.log(this.state.database);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    const steps = ["", "", "", ""];

    const getStepContent = step => {
      switch (step) {
        case 0:
          return <FirstStep saveData={this.addDataFormOtherComponent} nextStep={this.handleNext} />;
        case 1:
          return (
            <SecondStep
              previousStep={this.handleBack}
              nextStep={this.handleNext}
            />
          );
        case 2:
          return (
            <ThirdStep
              previousStep={this.handleBack}
              nextStep={this.handleNext}
            />
          );
        case 3:
          return <Review />;
        default:
          throw new Error("Unknown step");
      }
    };

    return (
      <div
        style={{
          marginTop: "100px",
          width: "-webkit-fill-available",
          height: "100%"
        }}
      >
        <React.Fragment>
          <CssBaseline />
          <Header />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div>
                      {activeStep === steps.length - 1 ? (
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                            style={{ float: "right" }}
                          >
                            Place order
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
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

export default withStyles(styles)(Checkout);
