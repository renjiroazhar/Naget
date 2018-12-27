import React from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";
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
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons Icons
import PendingIcon from "@material-ui/icons/AccessTime";
import SuccesIcon from "@material-ui/icons/CheckCircleOutline";
import CancelledIcon from "@material-ui/icons/HighlightOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from '@material-ui/icons/Add'
//moment for converting time
import moment from "moment";
import "moment/locale/id";

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

function OrderTable(props) {
  const { classes, orders } = props;
  if (!isLoaded(orders)) {
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
            color="primary"
            // onClick={() => this.showNotification("tl")}
          >
            Add Order
          <div style={{marginLeft: '10px', width: '20px', height: '20px'}}>  
          <AddIcon/>
          </div>
          </Button>
        </GridItem>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Orders</h4>
            <p className={classes.cardCategoryWhite}>List of Order</p>
          </CardHeader>
          <CardBody>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Name</TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      Address
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      Phone
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      Pick Up Time
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.map(row => {
                      return (
                        (
                          <TableRow key={row.id}>
                            <TableCell
                              className={classes.tableCell}
                              component="th"
                              scope="row"
                            >
                              {row.user.name}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="right"
                            >
                              {row.location.alamat}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="right"
                            >
                              {row.user.phone}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="right"
                            >
                              {moment(row.orderDate.toDate()).format("LLLL")}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="right"
                            >
                              {row.status === "WAITING_CONFIRMATION" ? (
                                <Tooltip
                                  title="Waiting Confirmation"
                                  placement="top-start"
                                >
                                  <PendingIcon />
                                </Tooltip>
                              ) : row.status === "SUCCESS" ? (
                                <Tooltip
                                  title="Order Success"
                                  placement="top-start"
                                >
                                  <SuccesIcon />
                                </Tooltip>
                              ) : row.status === "CANCELED_BY_USER" ? (
                                <Tooltip
                                  title="Order Cancelled"
                                  placement="top-start"
                                >
                                  <CancelledIcon />
                                </Tooltip>
                              ) : row.status === "CANCELED_BY_ADMIN" ? (
                                <Tooltip
                                  title="Order Cancelled"
                                  placement="top-start"
                                >
                                  <CancelledIcon />
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        )
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

OrderTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state)
  return {
    orders: state.firestore.ordered.orders
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
  firestoreConnect([{ collection: "orders" }])
)(withStyles(styles)(OrderTable));
