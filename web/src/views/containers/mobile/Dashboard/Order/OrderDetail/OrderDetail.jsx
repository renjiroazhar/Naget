import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeft from "@material-ui/icons/ArrowBack";
import "react-viewer/dist/index.css";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "moment/locale/id";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  list: {
    padding: 0
  },
  list2: {
    padding: 6
  }
});

class OrderDetail extends React.Component {
  state = {
    open: true,
    visible: false,
    createdAt: "",
    logs: [],
    status: "",
    user: [],
    userId: "",
    isLoading: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  cancelOrder = () => {
    axios.patch(`https://mysqlnaget.herokuapp.com/api/Orders/${this.props.match.params.id}`, {
      status: "Canceled"
    })
    this.props.history.push("/order");
  };

  backPage = () => {
    this.props.history.push("/order");
  };

  async componentDidMount() {
    this.setState({
      isLoading: true
    })
    const response = await axios.get(`https://mysqlnaget.herokuapp.com/api/Orders/${this.props.match.params.id}`)
    try {
      console.log(response)
      this.setState({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        variant: response.data.variant,
        productPrice: response.data.productPrice,
        count: response.data.count,
        total: response.data.total,
        description: response.data.description,
        status: response.data.status,
        orders: response.data,
        isLoading: false
      })
    } catch (error) {
      alert(error)
      throw new Error(error)
    }
  }

  render() {
    const { classes } = this.props;
    const { isLoading, status } = this.state;

    if (!isLoading) {
      return (
        <div style={{ backgroundColor: "#e7e7e7" }}>
          <div style={{ flex: 1 }}>
            <AppBar
              style={{ width: "100%", backgroundColor: "#fecb00ff" }}
              position="static"
            >
              <Toolbar style={{ paddingLeft: 0 }}>
                <IconButton
                  onClick={this.backPage}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <ArrowLeft />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  style={{ fontSize: "20px" }}
                  className={classes.grow}
                >
                  Detail
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div
            style={{
              height: "100%",
              backgroundColor: "#ffffff",
              width: "100%",
              padding: "10px",
              marginLeft: "-3px"
            }}
          >
            <List style={{ overflow: "hidden" }}>
            <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Order ID" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.id ? "" : this.state.id}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Name" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.username ? "" : this.state.username}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Email" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.email ? "" : this.state.email}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Address" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.address ? "" : this.state.address}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText
                    style={{ float: "left" }}
                    secondary="Phone Number"
                  />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.phone ? "" : this.state.phone}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Variant" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.variant ? "" : this.state.variant}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Product Price" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.productPrice ? "" : this.state.productPrice}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Count" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.count ? "" : this.state.count}
                  />
                </ListItem>
              </List>
              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText style={{ float: "left" }} secondary="Total" />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={!this.state.total ? "" : this.state.total}
                  />
                </ListItem>
              </List>

              <List className={classes.list} onClick={this.handleClickOpen}>
                <ListItem button onClick={this.handleClickOpen}>
                  <ListItemText
                    style={{ float: "left" }}
                    secondary="Driver Note"
                  />
                </ListItem>
                <ListItem style={{ paddingTop: 0 }}>
                  <ListItemText
                    style={{ float: "left" }}
                    primary={this.state.description ? this.state.description : ""}
                  />
                </ListItem>
              </List>
            </List>

            {status === "Canceled" || "Arrived" ? ("") : (<div
              style={{
                textAlign: "center",
                bottom: 0,
                height: "46px",
                backgroundColor: "white",
                width: "100%"
              }}
            >
              <Button
                varian="contained"
                style={{
                  backgroundColor: "#f43c3c",
                  width: "90%",
                  textAlign: "center",
                  color: "#ffffff"
                }}
                onClick={this.cancelOrder}
              >
                Cancel Order
              </Button>
            </div>)}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: "#e7e7e7",
            height: "100%"
          }}
        >
          <div style={{ flex: 1 }}>
            <AppBar
              style={{ width: "100%", backgroundColor: "#fecb00ff" }}
              position="static"
            >
              <Toolbar>
                <IconButton
                  onClick={this.backPage}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <ArrowLeft />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  Detail
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div
            style={{
              textAlign: "center",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <CircularProgress />
          </div>
        </div>
      );
    }
  }
}

OrderDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

const composingOrderDetail = (withStyles(styles)(withRouter(OrderDetail)));

export { composingOrderDetail as OrderDetail };
