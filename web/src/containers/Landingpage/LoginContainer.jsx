import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions/authActions';
import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
	state = {
		email: '',
		password: ''
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
				console.log('Login Gagal');
			} else {
				console.log('Login Berhasil');
			}
		});
	};

	login = () => {
		this.props.signIn(this.state);
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { redirect } = this.props;
		return (
			<div>
				<br />
				<h2 align="center" style={{ marginTop: '90px' }}>
					Login Page
				</h2>

				<Row type="flex" justify="center">
					<Col>
						<br />
						<Card style={{ maxWidth: 280, alignContent: 'center' }}>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
									{getFieldDecorator('userName', {
										rules: [
											{ required: true, message: 'Please input your email!' }
										]
									})(
										<Input
											prefix={
												<Icon
													type="user"
													style={{ color: 'rgba(0,0,0,.25)' }}
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
									{getFieldDecorator('password', {
										rules: [
											{ required: true, message: 'Please input your Password!' }
										]
									})(
										<Input
											name="password"
											value={this.state.password}
											onChange={this.handleChange}
											prefix={
												<Icon
													type="lock"
													style={{ color: 'rgba(0,0,0,.25)' }}
												/>
											}
											type="password"
											placeholder="Password"
										/>
									)}

									<a className="login-form-forgot" href="/forget_password">
										Forgot password?
									</a>
								</FormItem>

								<FormItem>
									<Button
										onClick={() => {
											this.login();
										}}
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										Log in
									</Button>
								</FormItem>
							</Form>
						</Card>
					</Col>
				</Row>
				{redirect ? <Redirect to="/home" /> : ''}
			</div>
		);
	}
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
	console.log(state);
	return {
		authError: state.auth.authErr,
		redirect: state.auth.redirect
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: creds => dispatch(signIn(creds))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappedNormalLoginForm);
