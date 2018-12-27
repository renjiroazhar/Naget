import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from "@material-ui/core/TextField";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

// calls redux action
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";

class LoginPage extends React.Component {
  // we use this to make the card to appear after the page has been rendered
  state = {
    cardAnimaton: "cardHidden",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  loginFunction = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const {signIn} = this.props;
    let creds = {
        email, password
    }
    signIn(creds)
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, authError, isInvalid } = this.props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="success" className={classes.cardHeader}>
                      <h3>Login</h3>
                    </CardHeader>
                    <CardBody>
                      <TextField
                        id="email"
                        onChange={this.handleChange}
                        label="Email"
                        style={{ width: "100%" }}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        id="password"
                        onChange={this.handleChange}
                        label="Password"
                        type="password"
                        style={{ width: "100%" }}
                        margin="normal"
                        variant="outlined"
                      />
                      {authError ? <div style={{textAlign: 'center', color: 'red'}}>{authError}</div>: null}
                      {isInvalid ? <div style={{textAlign: 'center', color: 'red'}}>{isInvalid}</div>: null}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        onClick={this.loginFunction}
                        simple
                        color="success"
                        size="lg"
                      >
                        Login
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
