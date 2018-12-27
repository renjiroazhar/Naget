import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { connect } from "react-redux";
import { addArea } from "../../../redux/actions/areasActions";

const styles = {
  formControl: {
    width: "100%"
  },
  helperText: {
    color: "red"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AddAreas extends Component {
  state = {
    name: "",
    lineId: "",
    lineIdIsEmpty: false,
    nameIsEmpty: false,
    allEmpty: false
  };

  validateData = () => {
    const { name, lineId } = this.state;
    if (name.length === 0 && lineId.length === 0) {
      this.setState({
        allEmpty: true
      });
      console.log("KOSONG ?");
    }
    if (name.length < 0 || name === "") {
      console.log("Name Cannot Be Empty");
      this.setState({
        nameIsEmpty: true
      });
    }
    if (lineId.length < 0 || lineId === "") {
      console.log("lineId Cannot Be Empty");
      this.setState({
        lineIdIsEmpty: true
      });
    }

    setTimeout(() => {
      this.setState({
        lineIdIsEmpty: false,
        nameIsEmpty: false,
        allEmpty: false
      });
    }, 5000);
    // this.signUpFunction();
  };

  addAreas = () => {
    const { lineId, name } = this.state;
    let data = {
      lineId,
      name
    };
    this.props.addArea(data);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.validateData();
    this.addAreas();
    console.log(this.state);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { allEmpty, nameIsEmpty, lineIdIsEmpty, name, lineId } = this.state;
    const { classes, messageAlert } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Add Area</h4>
                <p className={classes.cardCategoryWhite}>
                  Add Area to Pick Trash
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Areas Name"
                      type="text"
                      style={{ marginBottom: "10px" }}
                      fullWidth
                      variant="outlined"
                      required
                      value={name}
                      onChange={this.handleChange}
                    />
                    {!allEmpty ? (
                      !nameIsEmpty ? (
                        ""
                      ) : (
                        <FormHelperText
                          variant="outlined"
                          style={styles.helperText}
                        >
                          Required
                        </FormHelperText>
                      )
                    ) : (
                      <FormHelperText
                        variant="outlined"
                        style={styles.helperText}
                      >
                        Required
                      </FormHelperText>
                    )}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="lineId"
                      variant="outlined"
                      label="ID Line"
                      type="text"
                      required
                      value={lineId}
                      onChange={this.handleChange}
                      style={{ marginBottom: "10px" }}
                      fullWidth
                    />
                    {!allEmpty ? (
                      !lineIdIsEmpty ? (
                        ""
                      ) : (
                        <FormHelperText
                          variant="outlined"
                          style={styles.helperText}
                        >
                          Required
                        </FormHelperText>
                      )
                    ) : (
                      <FormHelperText
                        variant="outlined"
                        style={styles.helperText}
                      >
                        Required
                      </FormHelperText>
                    )}
                  </GridItem>
                </GridContainer>
                {messageAlert ? (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#000000", textAlign: "center" }}>
                      {messageAlert}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </CardBody>
              <CardFooter>
                <Button color="success" onClick={this.handleSubmit}>
                  Add Areas
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messageAlert: state.areas.messageAlert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArea: data => dispatch(addArea(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddAreas));
