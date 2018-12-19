import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import { storage } from '../../../services/firebaseConfig';
import { createOrder } from '../../../redux/actions/orderActions';
import { connect } from 'react-redux';

export class UserForm extends Component {
	state = {
		step: 1,
		name: '',
		phone: '',
		email: '',
		time: '',
		occupation: '',
		city: '',
		bio: '',
		address: '',
		foto: [],
		previewGeneralPhotos: [],
		generalPhotos: [],
		downloadURLs: [],
		uploadProgress: 0,
		filenames: [],
		allowSend: false,

		isUploading: false,

		loading: false
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

	handleSendOrder = () => {
		if (this.state.downloadURLs !== [] || this.state.downloadURLs.length > 0) {
			this.setState({
				allowSend: true
			});
		} else {
			this.setState({
				allowSend: false
			});
		}
	};

	allowSend = () => {
		this.setState({
			allowSend: true
		});
	};
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

	isLoading = () => {
		this.setState({
			loading: true
		});
	};

	isLoaded = () => {
		this.setState({
			loading: false
		});
	};

	handleUpload = () => {
		const { previewGeneralPhotos } = this.state;
		if (previewGeneralPhotos !== [] || previewGeneralPhotos.length > 0) {
			const promises = [];
			previewGeneralPhotos.forEach(file => {
				const uploadTask = storage
					.ref(`images/${previewGeneralPhotos.name}`)
					.put(file);
				promises.push(uploadTask);

				uploadTask.on(
					'state_changed',
					snapshot => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(progress);
						this.setState({
							loading: true
						});
					},
					error => {
						console.log(error);
					},
					() => {
						uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
							console.log(downloadURL);
							this.setState(oldState => ({
								downloadURLs: [...oldState.downloadURLs, downloadURL]
							}));
							console.log(this.state.downloadURLs);
							if (
								this.state.downloadURLs.length ===
								this.state.previewGeneralPhotos.length
							) {
								this.handleSendOrder();
								this.isLoaded();
							}
						});
					}
				);
			});

			Promise.all(promises).then(tasks => {
				console.log('all uploads complete', tasks);
				this.setState({
					loading: false
				});
			});
		} else {
			this.props.createOrder(this.state);
			this.nextStep();
		}
	};

	handleCreateOrder = () => {
		this.props.createOrder(this.state);
		this.nextStep();
	};

	handleChangeTime = time => {
		this.setState({
			time: time
		});
	};

	render() {
		const { step } = this.state;
		const {
			name,
			phone,
			email,
			time,
			occupation,
			city,
			bio,
			address,
			foto,
			generalPhotos,
			previewGeneralPhotos,
			downloadURLs,
			loading,
			allowSend
		} = this.state;
		const values = {
			name,
			phone,
			allowSend,
			time,
			email,
			address,
			occupation,
			city,
			bio,
			foto,
			loading,
			generalPhotos,
			previewGeneralPhotos,
			downloadURLs
		};
		const { changeVisibilityTrue } = this.props;

		switch (step) {
			case 1:
				return (
					<FormUserDetails
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
						changeVisibilityTrue={changeVisibilityTrue}
					/>
				);
			case 2:
				return (
					<FormPersonalDetails
						nextStep={this.nextStep}
						changeVisibilityTrue={changeVisibilityTrue}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleChangeFoto={this.handleChangeFoto}
						values={values}
						onDropGeneral={this.onDropGeneral}
						deleteImage={this.deleteImage}
						handleChangeTime={this.handleChangeTime}
						allowSend={this.allowSendOrder}
					/>
				);
			case 3:
				return (
					<Confirm
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						changeVisibilityTrue={changeVisibilityTrue}
						values={values}
						handleUpload={this.handleUpload}
						handleCreateOrder={this.handleCreateOrder}
						isLoading={this.isLoading}
					/>
				);
			case 4:
				return (
					<Success
						handleCreateOrder={this.handleCreateOrder}
						values={values}
						changeVisibilityTrue={changeVisibilityTrue}
					/>
				);
			default:
				return new Error();
		}
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createOrder: data => dispatch(createOrder(data))
	};
};

const mapStateToProps = state => {
	console.log(state);
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserForm);
