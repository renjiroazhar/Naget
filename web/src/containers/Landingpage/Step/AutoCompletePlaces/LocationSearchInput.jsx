import React from 'react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';

class LocationSearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { address: '', lat: 0, lng: 0 };
	}

	handleChange = address => {
		this.setState({ address });
		console.log(this.state);
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				console.log('Success', latLng, address);
				this.setState({
					address: address,
					lat: latLng.lat,
					lng: latLng.lng
				});
				console.log(this.state);
			})
			.catch(error => console.error('Error', error));
	};

	render() {
		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<TextField
							{...getInputProps({
								className: 'location-search-input'
							})}
							label="Pilih Area"
							style={{ color: 'black' }}
							fullWidth
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Loading...</div>}
							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default LocationSearchInput;
