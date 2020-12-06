import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { restaurantLoginMutation } from '../../mutations/mutations';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantsLogin } from '../../actions/loginActions';
const jwt_decode = require('jwt-decode');

class RestaurantsLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.restaurantLoginMutation({
      variables: {
        email: this.state.username,
        password: this.state.password,
      },
    });
    let response = mutationResponse.data.restaurantLogin;
    console.log('resp:', response);
    if (response) {
      console.log('Login response:', response);
      if (response.status === '200') {
        this.setState({
          success: true,
          data: response.message,
          rest_authFlag: true,
        });
      } else {
        console.log('error:', response.message);
        this.setState({
          message: response.message,
          rest_authFlag: true,
        });
      }
    }
  };
  render() {
    let redirectVar = null;
    let message = '';
    if (this.state.rest_authFlag && this.state.success) {
      localStorage.setItem('token', this.state.data);
      var test = localStorage.getItem('token');
      console.log('Token: ', test);
      var decoded = jwt_decode(this.state.data.split(' ')[1]);
      console.log(
        'id and name from token: ',
        decoded._id + decoded.name + decoded.email
      );
      localStorage.setItem('restaurant_id', decoded._id);
      localStorage.setItem('restaurant_name', decoded.name);
      localStorage.setItem('type', 'restaurant');

      alert('Logged in successfully');
      redirectVar = <Redirect to='/restaurantProfile' />;
    } else if (
      !this.state.success &&
      this.state.rest_authFlag &&
      this.state.message === 'INCORRECT_PASSWORD'
    ) {
      message = 'Invalid username or password';
    }
    return (
      <div>
        {redirectVar}
        <div>
          <div class='main-div'>
            <div class='panel'>
              <h2>Restaurant Login</h2>
              <p>Please enter your username and password</p>
            </div>
            <form onSubmit={this.onSubmit}>
              <div class='form-group'>
                <input
                  type='email'
                  class='form-control'
                  name='username'
                  onChange={this.onChange}
                  placeholder='Username'
                  title='email address'
                  required
                />
              </div>
              <div class='form-group'>
                <input
                  type='password'
                  class='form-control'
                  name='password'
                  onChange={this.onChange}
                  placeholder='Password'
                  required
                />
              </div>
              <div style={{ color: '#ff0000' }}>{message}</div>
              <button type='submit' class='btn btn-primary'>
                Login
              </button>
              <div>
                <p>
                  Don't have an account?{' '}
                  <Link to='/restaurantsSignup'> Signup here</Link>
                </p>
                <p>
                  <Link to='/login'>Customer? Click here to sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(restaurantLoginMutation, {
  name: 'restaurantLoginMutation',
})(RestaurantsLogin);
