import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { customerLoginMutation } from '../../mutations/mutations';
const jwt_decode = require('jwt-decode');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_authFlag: false,
      success: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.customerLoginMutation({
      variables: {
        email: this.state.email,
        password: this.state.password,
      },
    });
    let response = mutationResponse.data.customerLogin;
    console.log('resp:', response);
    if (response) {
      console.log('Login response:', response);
      if (response.status === '200') {
        this.setState({
          success: true,
          data: response.message,
          cust_authFlag: true,
        });
      } else {
        console.log('error:', response.message);
        this.setState({
          message: response.message,
          cust_authFlag: true,
        });
      }
    }
  };

  render() {
    let redirectVar = null;
    let message = '';
    if (this.state.cust_authFlag && this.state.success) {
      localStorage.setItem('token', this.state.data);
      var test = localStorage.getItem('token');
      console.log('Token: ', test);
      var decoded = jwt_decode(this.state.data.split(' ')[1]);
      console.log(
        'id and name from token: ',
        decoded._id + decoded.name + decoded.email
      );
      localStorage.setItem('customer_id', decoded._id);
      localStorage.setItem('customer_name', decoded.name);
      localStorage.setItem('type', 'customer');

      alert('Logged in successfully');
      redirectVar = <Redirect to='/customerHome' />;
    } else if (
      !this.state.success &&
      this.state.cust_authFlag &&
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
              <h2>Customer Login</h2>
              <p>Please enter your username and password</p>
            </div>
            <form onSubmit={this.onSubmit}>
              <div class='form-group'>
                <input
                  onChange={this.onChange}
                  type='text'
                  class='form-control'
                  name='email'
                  placeholder='Username'
                  required
                />
              </div>
              <div class='form-group'>
                <input
                  onChange={this.onChange}
                  type='password'
                  class='form-control'
                  name='password'
                  placeholder='Password'
                  required
                />
              </div>
              <div style={{ color: '#ff0000' }}>{message}</div>
              <button type='submit' class='btn btn-primary'>
                Login
              </button>
              <div class='signup-section'>
                <div>
                  <p>
                    Don't have an account?
                    <Link to='/CustomersSignup'> Signup here</Link>
                  </p>
                  <p>
                    <Link to='/RestaurantsLogin'>
                      Restaurant? Click here to sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <div class="restaurant-form"> <RestaurantsLogin /></div> */}
      </div>
    );
  }
}

export default graphql(customerLoginMutation, {
  name: 'customerLoginMutation',
})(Login);
