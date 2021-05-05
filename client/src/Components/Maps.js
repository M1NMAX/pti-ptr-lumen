
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%'
  }
  
  export class MapContainer extends Component {
    render(lat,lon) {
      return (
        <Map 
          google={this.props.google}
          zoom={14}
          style={containerStyle}
          initialCenter={
            {
              lat: -1.2884,
              lng: 36.8233
            }
          }
        />
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyClKX6D_oEcpoKjCCjvMKDuZ1JjvOx-3uM'
  })(MapContainer);
