import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

const mapStyles = {
  width: '500px',
  height: '500px'
};

Geocode.setApiKey("AIzaSyAXlNf-MoO09CftUsjp5UiMHaZWvc2ydwE");

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.initialise();
  } 

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    data: []
  };

  initialise = () => {
    console.log('Restaurants list in maps:', this.props.restaurants)
    for (let restaurant of this.props.restaurants) {
      
      let name = restaurant.name;
    Geocode.fromAddress(restaurant.location).then(
      response => {
           
            const { lat, lng } = response.results[0].geometry.location;
            this.state.data.push( <Marker position={{lat: lat, lng: lng}} 
              onClick={this.onMarkerClick}
              name={name}  
            />)
            this.forceUpdate()
          },
          error => {
            console.error(error);
          }
        )
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={
        {
            lat: 37.368,
            lng: -122.03
          }
        }
      >
      {this.state.data}
      {/* <Marker position={this.state.position} 
              onClick={this.onMarkerClick}
              name={'Works!!!'}
      /> */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAXlNf-MoO09CftUsjp5UiMHaZWvc2ydwE'
})(MapContainer);