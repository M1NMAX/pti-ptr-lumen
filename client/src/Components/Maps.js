
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const style = {
  position:"static",
  maxWidth: "450px",
  left:"20px",
  height: "350px",
  overflowX: "hidden",
  overflowY: "hidden"
 };
 const containerStyle = {
  position: "absolute",
  maxWidth: "450px",
  height: "350px"
 };
  
  export class MapContainer extends Component {
    
    render() {
      console.log(this.props.coordinates[0]);

      console.log(this.props.coordinates[1]);
      return (
        <Map 
          google={this.props.google}
          zoom={14}
          style={style}
          containerStyle={containerStyle}
          initialCenter={
            {
              lat: this.props.coordinates[0],
              lng: this.props.coordinates[1]
            }
          }>
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: this.props.coordinates[0], lng: this.props.coordinates[1]}} />
        </Map>
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyClKX6D_oEcpoKjCCjvMKDuZ1JjvOx-3uM'
  })(MapContainer);
