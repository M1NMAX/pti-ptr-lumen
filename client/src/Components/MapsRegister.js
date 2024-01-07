
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const style = {
  position:"static",
  maxWidth: "350px",
  height: "350px",
  overflowX: "hidden",
  overflowY: "hidden"
 };
 const containerStyle = {
  position: "absolute",
  maxWidth: "350px",
  height: "350px"
 };
  
  export class MapContainer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        address: 'Lisboa',
        mapCenter: {
          lat: 38.736946,
          lng: -9.142685
        }
      };
    }
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          console.log('Success', latLng);
          this.setState({address});
          this.setState({mapCenter: latLng});
          console.log(this.state.mapCenter)
          this.props.parentCallback([address,this.state.mapCenter]);
        })
        .catch(error => console.error('Error', error));
    };

    render() {
      return (
        <div id="googleMaps">
           <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
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
                          style,
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
          <Map 
            google={this.props.google}
            zoom={18}
            style={style}
            containerStyle={containerStyle}
            initialCenter={
                {
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }
            }
            center={
                {
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }
            }
            >
            <Marker
                position={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
            />
          </Map>

        </div>
        
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer);
