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
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.jsx";
import AddIcon from "@material-ui/icons/PersonAddOutlined";
import SettingIcon from "@material-ui/icons/BuildOutlined";
import Tooltip from "@material-ui/core/Tooltip";

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

class UserTable extends React.Component {
  render() {
    const { classes, users } = this.props;
    if (!isLoaded(users)) {
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
              component={Link}
              to="/add_user"
              // onClick={() => this.showNotification("tl")}
            >
              Add User
              <div
                style={{ marginLeft: "10px", width: "20px", height: "20px" }}
              >
                <AddIcon />
              </div>
            </Button>
          </GridItem>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Users</h4>
              <p className={classes.cardCategoryWhite}>
                List Of Registered User
              </p>
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
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users.map(row => {
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
                              align="right"
                            >
                              {row.address}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="right"
                            >
                              {row.phone}
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                              align="right"
                            >
                              {" "}
                              <Tooltip
                                title="User Setting"
                                placement="top-start"
                              >
                              <Link to={"/user_setting/"+ row.id} style={{textDecoration: 'none', color: "#000000"}}>
                                <SettingIcon />
                                </Link>
                              </Tooltip>
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

UserTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    users: state.firestore.ordered.users
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
  firestoreConnect([{ collection: "users" }])
)(withStyles(styles)(UserTable));
