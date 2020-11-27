import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Button } from 'react-bootstrap';
import RestaurantMenu from './menu';
import RestaurantViewReview from './restaurantViewReview';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getRestaurant } from '../../actions/restaurantProfileActions';
import { getRestaurantOne } from '../../queries/queries';
import { graphql } from 'react-apollo';

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: 'ChooseImage..',
    };
    this.getRestaurantProfile();
  }

  getRestaurantProfile = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log('Loading');
    } else {
      console.log('Grapghql data:', data);
    }
  };

  componentWillReceiveProps(props) {
    console.log('props:', props.data);
    this.setState({
      ...this.state,
      name: props.data.getRestaurant.name,
      email: props.data.getRestaurant.email,
      restaurantId: props.data.getRestaurant._id,
      description: props.data.getRestaurant.description,
      contact: props.data.getRestaurant.contact,
      timings: props.data.getRestaurant.timings,
      location: props.data.getRestaurant.location,
      cuisine: props.data.getRestaurant.cuisine,
    });
  }

  onImageUpload = (e) => {
    this.setState({
      filename: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onUserUpload = (e) => {
    const formData = new FormData();
    formData.append('resimage', this.state.filename);
    const uploadConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(
        `${backendServer}/restaurants/${this.state.restaurantId}/uploadImage`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert('Image uploaded successfully!');
        this.setState({
          userFileText: 'Choose file...',
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log('Error');
      });
  };

  render() {
    var imgsrc = `${backendServer}/restaurants/${this.state.restaurantId}/viewProfileImage`;

    return (
      <div>
        <div class='restaurantHome'>
          <h2 style={{ color: 'maroon' }}>
            {' '}
            <b>{this.state.name} </b>
          </h2>
          <img class='profile-photo' src={imgsrc}></img>
          <form onSubmit={this.onUserUpload}>
            <br />
            <br />
            <br />
            <div class='custom-file' style={{ width: '30%' }}>
              <input
                type='file'
                class='custom-file-input'
                name='filename'
                accept='image/*'
                onChange={this.onImageUpload}
                required
              />
              <label class='custom-file-label' for='user-file'>
                {this.state.fileText}
              </label>
            </div>
            <br />
            <br />
            <Button type='submit' variant='primary'>
              Upload
            </Button>
          </form>
          <p>
            {' '}
            <b>Cuisine:</b> {this.state.cuisine}
          </p>
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
        </div>
        <div>
          <h4 style={{ color: 'maroon' }}>
            <b> Menu: </b>
          </h4>
        </div>
        <div>
          <RestaurantMenu />
        </div>

        <div>
          <RestaurantViewReview />
        </div>
      </div>
    );
  }
}

// RestaurantProfile.propTypes = {
//   getRestaurant: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   user: state.getRestaurant.user,
// });

// export default connect(mapStateToProps, { getRestaurant })(RestaurantProfile);

export default graphql(getRestaurantOne, {
  options: {
    // TODO get customer id from localstorage
    variables: { restaurant_id: '5fa85cdb0f0d477c9147c39f' },
  },
})(RestaurantProfile);
