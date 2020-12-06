import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantsSignup } from '../../actions/signupActions';
import { addRestaurantMutation } from '../../mutations/mutations';
import { graphql } from 'react-apollo';

class RestaurantsSignup extends Component {
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
    let mutationResponse = await this.props.addRestaurantMutation({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        location: this.state.location,
      },
    });
    console.log('mutationResponse', mutationResponse);
    let response = mutationResponse.data.addRestaurant;
    if (response) {
      if (response.status === '200') {
        this.setState({
          success: true,
          signupFlag: true,
        });
      } else {
        this.setState({
          message: response.message,
          signupFlag: true,
        });
      }
    }
  };

  render() {
    let redirectVar = null;
    let display_msg = '';
    if (this.state.success && this.state.signupFlag) {
      alert('Registered successfully');
      redirectVar = <Redirect to='/restaurantsLogin' />;
    } else if (
      this.state.message === 'RESTAURANT_EXISTS' &&
      this.state.signupFlag
    ) {
      display_msg = 'Email id is already registered';
    }

    return (
      <div>
        {redirectVar}
        <Row>
          <Col>
            <div class='container'>
              <div class='login-form'>
                <div class='main-div'>
                  <div class='panel'>
                    <h2>Enter the details for Restaurant Signup</h2>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div class='form-group'>
                      <input
                        type='text'
                        class='form-control'
                        name='name'
                        onChange={this.onChange}
                        placeholder='Name'
                        required
                      />
                    </div>
                    <div class='form-group'>
                      <input
                        type='email'
                        class='form-control'
                        name='email'
                        onChange={this.onChange}
                        placeholder='Email Id'
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
                    <div class='form-group'>
                      <input
                        type='text'
                        class='form-control'
                        name='location'
                        onChange={this.onChange}
                        placeholder='Address'
                        required
                      />
                    </div>
                    <div style={{ color: '#ff0000' }}>{display_msg}</div>
                    <br />
                    <button type='submit' class='btn btn-primary'>
                      Signup
                    </button>
                    <br />
                    <br />
                    <div>
                      Already have an account?{' '}
                      <Link to='/restaurantsLogin'>Login</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

// RestaurantsSignup.propTypes = {
//   restaurantsSignup: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   user: state.signup.user,
// });

// export default connect(mapStateToProps, { restaurantsSignup })(
//   RestaurantsSignup
// );

export default graphql(addRestaurantMutation, {
  name: 'addRestaurantMutation',
})(RestaurantsSignup);
