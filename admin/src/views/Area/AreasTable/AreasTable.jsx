import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "components/CustomButtons/Button.jsx";
import LocationOn from "@material-ui/icons/LocationOn";

import { Link } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    root: {
      width: "100%",
      overflowX: "auto"
    },
    table: {
      minWidth: 340
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 5
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class AreasTable extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, areas } = this.props;
    if (!isLoaded(areas)) {
      return (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridItem xs={12} sm={12} md={3}>
            <Button
              fullWidth
              component={Link}
              to="/add_areas"
              color="primary"
            >
              Add Areas
              <div
                style={{ marginLeft: "10px", width: "20px", height: "20px" }}
              >
                <LocationOn />
              </div>
            </Button>
          </GridItem>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Areas</h4>
              <p className={classes.cardCategoryWhite}>List Of Area</p>
            </CardHeader>
            <CardBody>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Name</TableCell>
                      <TableCell className={classes.tableCell}>Line Group ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {areas &&
                      areas.map(row => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell
                              className={classes.tableCell}
                              component="th"
                              scope="row"
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              component="th"
                              scope="row"
                            >
                              {row.lineGroupId}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Paper>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

AreasTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    areas: state.firestore.ordered.areas
  };
};
const mapDispatchToProps = dispatch => {
  return {
    orderAction: () => null
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "areas" }])
)(withStyles(styles)(AreasTable));
