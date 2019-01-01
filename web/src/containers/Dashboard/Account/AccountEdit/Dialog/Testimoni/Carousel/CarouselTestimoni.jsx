import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import Recycle from "../image/svg/009-recycle.svg";
import Recycling from "../image/svg/011-recycling.svg";
import Totebag from "../image/svg/004-tote-bag.svg";
import RecycleBin from "../image/svg/012-recycle-bin.svg";
import Green from "../image/svg/025-green.svg";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import './style/style.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label:
      "Sampah revisian skripsi jadi duit. Lumayan nih buat cover buat wisuda hahaha",
    imgPath: `${RecycleBin}`,
    name: "Fulan bin Fulan"
  },
  {
    label: "Sampah duit jadi revisian skripsi. Lumayan buat hahaha nih wisuda buat cover ",
    imgPath: `${Recycling}`,
    name: 'Fulan Bin Fulan'
  },
  {
    label: "Duit ? Sampah? ohhh",
    imgPath: `${Green}`,
    name: "Fulan bin Fulan"
  },
  {
    label: "Hmmmadasmm",
    imgPath: `${Recycle}`,
    name: "Fulan bin Fulan"
  },
  {
    label: "Hmmmmmmmmmmm",
    imgPath: `${Totebag}`,
    name: "Fulan bin Fulan"
  }
];

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    justifyContent: 'center',
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
    marginTop: "20px",
    fontStyle: "italic",
    color: "#757575",
    textAlign: "center"
  },
  name: {
    display: "flex",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
    fontWeight: "bold",
    textAlign: "center"
  },
  img: {
    height: "140px",
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%"
  },
  mobileStepper: {
    color: "#00c43e",
  },
  /* Styles applied to a dot if `variant="dots"` and this is the active step. */
  dot: {
    backgroundColor: "red",
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 2px',
  },
  /* Styles applied to a dot if `variant="dots"` and this is the active step. */
  dotActive: {
    backgroundColor: 'red',
  },
});

class CarouselTestimoni extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div>
                  <img className={classes.img} src={step.imgPath} alt="" />

                  <Paper square elevation={0} className={classes.header}>
                    <Typography style={{textAlign : 'center',justifyContent : "center"}} >{tutorialSteps[activeStep].label}</Typography>
                  </Paper>
                  <Paper square elevation={0} className={classes.name}>
                    <Typography style={{ fontWeight: "bold" }}>{`${
                      tutorialSteps[activeStep].name
                    }, ${`Mahasiswa`}`}</Typography>
                  </Paper>
                </div>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        nextButton={
          <Button varian="contained" size="small" onClick={this.handleNext} disabled={this.state.activeStep === 5}>
          </Button>
        }
        backButton={
          <Button varian="contained" size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
         
          </Button>
        }
      />
      </div>
    );
  }
}

CarouselTestimoni.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CarouselTestimoni);
