import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TimeInput from "material-ui-time-picker";
import { connect } from "react-redux";
import ImagesUploader from "react-images-uploader";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";

const styles = theme => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#00c43e",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      color: "white"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class SecondStep extends React.Component {
  state = {
    secondary: false,
    time: "",
    selectedFiles: null,
    pictures: [],
    pictureURLs: null
  };

  handleChange = value => {
    this.setState({
      time: value
    });
  };

  onDrop = picture => {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
    console.log(this.state.pictures);
  };

  handleBack = () => {
    const { order, DeleteDataStep } = this.props;
    this.props.previousStep();
    DeleteDataStep(order.name, order.address, order.area, order.phone);
    console.log(order);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.nextStep();
  };

  // displayPicture = e => {
  //   const files = e.target.files;

  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];
  //     //Only pics
  //     if (!file.type.match("image")) continue;

  //     var picReader = new FileReader();
  //     picReader.addEventListener("load", e => {
  //       var picFile = e.target;
  //       this.setState({
  //         pictureURLs: picReader.result,
  //         pictures: picFile
  //       });
  //     });
  //     //Read the image
  //     picReader.readAsDataURL(file);
  //   }

  //   console.log(file);
  // };

  render() {
    const { secondary, time } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Tanggal"
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Add">
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <hr />
            </List>
          </Grid>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Jam"
                  secondary={secondary ? "Secondary text" : null}
                />
                <TimeInput
                  mode="24h"
                  id="time"
                  value={time}
                  onChange={time => {
                    this.handleChange(time);
                    console.log(time);
                  }}
                />
              </ListItem>
              <hr />
            </List>
          </Grid>

          <Grid item xs={12}>
            <ImagesUploader
              url="gs://more-thrash.appspot.com"
              optimisticPreviews
              onLoadEnd={err => {
                if (err) {
                  console.error(err);
                }
              }}
              label="Upload multiple images"
            />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <img src={this.state.pictureURLs} alt="" height="25" width="25" />

            <Grid item xs={12} sm={12}>
              <div>
                <Button
                  style={{
                    float: "left",
                    backgroundColor: "red",
                    color: "white"
                  }}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Kembali
                </Button>
              </div>

              <div
                style={{
                  textAlign: "right",
                  justifyContent: "right",
                  float: "right"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  className={classes.button}
                  style={{ float: "right" }}
                >
                  Selanjutnya
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SecondStep.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    order: state.order
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SecondStep));
