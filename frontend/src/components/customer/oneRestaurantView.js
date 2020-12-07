import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import CustomerLoginCheck from './customerLoginCheck';
import OneRestaurantMenuView from './oneRestaurantMenuView';
import CustomerAddReview from './customerAddReview';
import CustomerViewReview from './customerViewReview';
import Dropdown from 'react-dropdown';
import { getRestaurantOne } from '../../queries/queries';
import { graphql, withApollo } from 'react-apollo';

class OneRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantInfo();
  }

  getRestaurantInfo = async () => {
    const { data } = await this.props.client.query({
      query: getRestaurantOne,
      variables: { restaurant_id: this.props.match.params.resid },
      // fetchPolicy: 'no-cache',
    });
    console.log('data from getRest:', data);
    this.setState({
      name: data.getRestaurant.name,
      email: data.getRestaurant.email,
      restaurantId: data.getRestaurant.id,
      description: data.getRestaurant.description,
      contact: data.getRestaurant.contact,
      timings: data.getRestaurant.timings,
      location: data.getRestaurant.location,
      deliverymode: data.getRestaurant.deliverymode,
    });
    // this.setState({
    //   pageCount: Math.ceil(this.state.dishes.length / this.state.perPage),
    // });
    if (data.loading) {
      console.log('Loading');
    } else {
      console.log('Grapghql data:', data);
      console.log('params', this.props.match.params.resid);
    }
  };

  _onSelect = (val) => {
    this.setState({
      selectedDm: val.value,
    });
  };
  render() {
    console.log('DM: ', this.state.deliverymode);
    if (this.state.deliverymode) {
      var options = this.state.deliverymode.split(' ');
    }
    var imgsrc = `${backendServer}/restaurants/${this.props.match.params.resid}/viewProfileImage`;
    return (
      <div>
        {/* <CustomerLoginCheck /> */}
        <div class='restaurantHome'>
          <h2 style={{ color: 'maroon' }}>
            {' '}
            <b>{this.state.name} </b>
          </h2>
          <img class='profile-photo' src={imgsrc}></img>
          <p>
            {' '}
            <b>Description:</b> {this.state.description}
          </p>
          <p>
            {' '}
            <b>Phone:</b> {this.state.contact}{' '}
          </p>
          <p>
            {' '}
            <b>Email:</b> {this.state.email}{' '}
          </p>
          <p>
            {' '}
            <b>Our Address:</b> {this.state.location}
          </p>
          <p>
            {' '}
            <b>Timings:</b> {this.state.timings}{' '}
          </p>
          <p>
            {' '}
            <b>Delivery Modes offered:</b> {this.state.deliverymode}{' '}
          </p>
        </div>
        <div>
          <h4 style={{ color: 'maroon' }}>
            {' '}
            <b> Menu: </b>
          </h4>
          <p>Select mode of delivery: </p>
          <Dropdown
            options={options}
            value={this.state.selectedDm}
            onChange={this._onSelect}
            placeholder='Delivery mode'
          />
          <OneRestaurantMenuView
            dm={this.state.selectedDm}
            resid={this.props.match.params.resid}
          />
          <CustomerViewReview resid='5fa85cdb0f0d477c9147c39f' />
        </div>
      </div>
    );
  }
}

export default withApollo(OneRestaurantView);
