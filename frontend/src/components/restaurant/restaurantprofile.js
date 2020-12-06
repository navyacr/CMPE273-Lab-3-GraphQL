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
    this.forceUpdate();
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
    var imgsrc = `data:image/png;base64,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`;

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
    variables: { restaurant_id: localStorage.getItem('restaurant_id') },
    // fetchPolicy: 'network-only',
  },
})(RestaurantProfile);
