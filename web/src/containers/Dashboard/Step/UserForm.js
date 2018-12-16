import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import { Page } from 'react-onsenui';

export class UserForm extends Component {
	state = {
		step: 1,
		firstName: '',
		lastName: '',
		email: '',
		occupation: '',
		city: '',
		bio: '',
		foto: [],
		previewGeneralPhotos: [],
		generalPhotos: []
	};

	// Proceed to next step
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	};

	// Go back to prev step
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		});
	};

	pushPage() {
		this.props.navigator.pushPage();
	}

	popPage() {
		this.props.navigator.popPage();
	}

	// Handle fields change
	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
		console.log(this.state);
	};

	handleChangeFoto = input => event => {
		var dataPhotos = Array.from(event.target.files);
		this.setState({ [input]: dataPhotos });
		console.log(this.state.foto);
	};

	deleteImage = params => {
		const { previewGeneralPhotos } = this.state;
		previewGeneralPhotos.splice(params, 1);
		this.setState({
			previewGeneralPhotos
		});
	};

	onDropGeneral = currentGeneralPhoto => {
		let index;
		for (index = 0; index < currentGeneralPhoto.length; ++index) {
			const file = currentGeneralPhoto[index];
			this.setState(({ previewGeneralPhotos }) => ({
				previewGeneralPhotos: previewGeneralPhotos.concat(file)
			}));
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = event => {
				this.setState({
					generalPhotos: this.state.generalPhotos.concat([
						{ base64: event.target.result }
					])
				});
			};
		}
	};

	render() {
		const { step } = this.state;
		const {
			firstName,
			lastName,
			email,
			occupation,
			city,
			bio,
			foto,
			generalPhotos,
			previewGeneralPhotos
		} = this.state;
		const values = {
			firstName,
			lastName,
			email,
			occupation,
			city,
			bio,
			foto,
			generalPhotos,
			previewGeneralPhotos
		};

		switch (step) {
			case 1:
				return (
					<Page>
						<FormUserDetails
							popPage={() => this.popPage()}
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</Page>
				);
			case 2:
				return (
					<Page>
						<FormPersonalDetails
							popPage={() => this.popPage()}
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							handleChangeFoto={this.handleChangeFoto}
							values={values}
							onDropGeneral={this.onDropGeneral}
							deleteImage={this.deleteImage}
						/>
					</Page>
				);
			case 3:
				return (
					<Page>
						<Confirm
							popPage={() => this.popPage()}
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							values={values}
						/>
					</Page>
				);
			case 4:
				return (
					<Page>
						<Success />
					</Page>
				);
			default:
				return new Error();
		}
	}
}

export default UserForm;
