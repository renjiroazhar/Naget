import React from 'react';
import { geolocated } from 'react-geolocated';
import Geocode from 'react-geocode';

class Demo extends React.Component {
	state = {
		lat: null,
		lng: null
	};

	handleMap = () => {
		if (
			!this.props.isGeolocationAvailable ||
			this.props.isGeolocationAvailable == null
		) {
			this.setState({
				lat: null,
				lng: null
			});
		}
		if (
			!this.props.isGeolocationEnabled ||
			this.props.isGeolocationEnabled === null
		) {
			this.setState({
				lat: null,
				lng: null
			});
		}

		if (!this.props.coords || this.props.coords === null) {
			this.setState({
				lat: null,
				lng: null
			});
		}

		if (!this.props.coords.latitude || this.props.coords.latitude === null) {
			this.setState({
				lat: null,
				lng: null
			});
		}

		if (!this.props.coords.longitude || this.props.coords.longitude === null) {
			this.setState({
				lat: null,
				lng: null
			});
		}
		this.setState({
			lat: this.props.coords.latitude,
			lng: this.props.coords.longitude
		});
		console.log(this.state);
	};
	componentWillUpdate() {
		console.log(this.props);
		Geocode.setApiKey('AIzaSyCcy5Lcolj9_QSEy8igYDOO7d4Ce4cTugs');

		// Enable or disable logs. Its optional.
		Geocode.enableDebug();

		// Get address from latidude & longitude.
		Geocode.fromLatLng('48.8583701', '2.2922926').then(
			response => {
				const address = response.results[0].formatted_address;
				console.log(address);
			},
			error => {
				console.error(error);
			}
		);

		// Get latidude & longitude from address.
		Geocode.fromAddress('Eiffel Tower').then(
			response => {
				const { lat, lng } = response.results[0].geometry.location;
				console.log(lat, lng);
			},
			error => {
				console.error(error);
			}
		);

		this.handleMap();
	}

	render() {
		return !this.props.isGeolocationAvailable ? (
			<div>Your browser does not support Geolocation</div>
		) : !this.props.isGeolocationEnabled ? (
			<div>Geolocation is not enabled</div>
		) : this.props.coords ? (
			<table>
				<tbody>
					<tr>
						<td>latitude</td>
						<td>{this.props.coords.latitude}</td>
					</tr>
					<tr>
						<td>longitude</td>
						<td>{this.props.coords.longitude}</td>
					</tr>
					<tr>
						<td>altitude</td>
						<td>{this.props.coords.altitude}</td>
					</tr>
					<tr>
						<td>heading</td>
						<td>{this.props.coords.heading}</td>
					</tr>
					<tr>
						<td>speed</td>
						<td>{this.props.coords.speed}</td>
					</tr>
				</tbody>
			</table>
		) : (
			<div>Getting the location data&hellip; </div>
		);
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true,
		maximumAge: 0,
		timeout: Infinity
	},
	watchPosition: false,
	userDecisionTimeout: null,
	suppressLocationOnMount: false,
	geolocationProvider: navigator.geolocation,
	userDecisionTimeout: 5000
})(Demo);
