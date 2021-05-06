
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


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
    
    render() {
      return (
        <Map 
          google={this.props.google}
          zoom={14}
          style={style}
          containerStyle={containerStyle}
          initialCenter={
            {
              lat: 37,
              lng: -5
            }
          }>
        </Map>
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyClKX6D_oEcpoKjCCjvMKDuZ1JjvOx-3uM'
  })(MapContainer);
