import React, { Component } from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
// import "react-flexy-table/dist/index.css";
// import RestaurantLoginCheck from './restaurantLoginCheck';
import StarRatings from 'react-star-ratings';
import { getRestaurantOne } from '../../queries/queries';
import { graphql } from 'react-apollo';

class RestaurantViewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getReviews();
  }

  getReviews = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log('Loading');
    } else {
      console.log('Grapghql data:', data);
    }
  };
  componentWillReceiveProps(props) {
    console.log('props in review:', props.data);
    this.setState({
      ...this.state,
      reviews: props.data.getRestaurant.reviews,
    });
  }

  render() {
    var data = [];

    if (this.state && this.state.reviews && this.state.reviews.length > 0) {
      for (let i = 0; i < this.state.reviews.length; i++) {
        data.push(
          <Card border='info' style={{ width: '40%' }}>
            <Card.Body>
              <a
                style={{ cursor: 'pointer' }}
                href={
                  '/oneEventAttendeeView/' + this.state.reviews[i].customerId
                }
              >
                <Card.Title>
                  <b>{this.state.reviews[i].customerName}</b>
                </Card.Title>
              </a>
              <Card.Text>
                <StarRatings
                  rating={Number(this.state.reviews[i].rating)}
                  starRatedColor='orange'
                  starDimension='15px'
                  starSpacing='2px'
                  numberOfStars={5}
                  changeRating=''
                  name='rating'
                />
              </Card.Text>
              <Card.Text>
                <b> Date: </b> {this.state.reviews[i].date.split('T')[0]}
              </Card.Text>
              <Card.Text>
                <b> Description: </b> {this.state.reviews[i].description}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      }
    }

    return (
      <div>
        <h4 style={{ color: 'maroon' }}>
          <b>Reviews:</b>
        </h4>
        {/* <RestaurantLoginCheck /> */}
        {data}
      </div>
    );
  }
}

export default graphql(getRestaurantOne, {
  options: {
    // TODO get customer id from localstorage
    variables: { restaurant_id: '5fa85cdb0f0d477c9147c39f' },
  },
})(RestaurantViewReview);
