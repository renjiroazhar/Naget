import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { Card, Row, Col } from "antd";
import axios from "axios";

const FormItem = Form.Item;

class ForgetPassword extends React.Component {
  state = {
    error: false,
    email: "",
    password: ""
  };

  resetPassword = () => {
    axios
      .post(
        'https://purchasing-stagging.herokuapp.com/api/People/login?include=["user"]',
        {
          email: this.state.email,
          password: this.state.password
        }
      )
      .then(res => {

        this.setState({
          email: "",
          password: ""
        });
        console.log(res);
        console.log(res.data.user);

        if (res.status >= 200 && res.status < 300) {
          console.log("Sukses");
          this.props.updateLogin();
          return res;
        }
      })
      .catch(error => {
        console.log(error.response)
        this.setState({
          error : true
        })
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setInitialValues = () => {
    const { form } = this.props;
    form.setFieldsValue({
      email: this.state.email,
      password: this.state.password
    });
  };

  componentDidMount() {
    this.setInitialValues();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("Login Gagal");
      } else {
        console.log('Login Berhasil')
      }
    });
  };
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <br />
        <h2 align="center" style={{ marginTop: "90px" }}>
         Reset Password
        </h2>

        <Row type="flex" justify="center">
          <Col>
            <br />
            <Card style={{ maxWidth: 280, alignContent: "center" }}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator("userName", {
                    rules: [
                      { required: true, message: "Please input your email!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Email"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}

                  <a className="login-form-forgot" href="">
                    Forgot password?
                  </a>
                </FormItem>
          
                <FormItem>  
                  <Button
                    onClick={() => {this.login()}}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  {this.state.error ? <h4 style={{textAlign : "center", color : "red"}}>Email / Password Anda Salah</h4> : ""}
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}
const WrappedForgetPassword = Form.create()(ForgetPassword);
export default WrappedForgetPassword;
