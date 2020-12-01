import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { customersSignup } from '../../actions/customersSignupActions';
import { addCustomerMutation } from '../../mutations/mutations';
import { graphql } from 'react-apollo';

//Define a Login Component
class CustomersSignup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      message: '',
      signupFlag: false,
    };
  }
  //Bind the handlers to this class

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    //prevent page from refresh
    e.preventDefault();
    let mutationResponse = await this.props.addCustomerMutation({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      },
    });
    console.log('mutationResponse', mutationResponse);
    let response = mutationResponse.data.addCustomer;
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

    // this.props.customersSignup(data);
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let display_msg = '';
    // console.log('Props user value:::');
    // console.log(this.props);
    // console.log(this.props.user.updatedList);
    if (this.state.success && this.state.signupFlag) {
      alert('Registered successfully');
      redirectVar = <Redirect to='/Login' />;
    } else if (
      this.state.message === 'CUSTOMER_EXISTS' &&
      this.state.signupFlag
    ) {
      display_msg = 'Email id is already registered';
    }
    return (
      <div>
        {redirectVar}
        <div class='container'>
          <div class='login-form'>
            <div class='main-div'>
              <div class='panel'>
                <h2>Customer Signup</h2>
                <p>Please enter your details</p>
                {/* <h4><font color='red'>{this.state}</font></h4> */}
              </div>
              <form onSubmit={this.onSubmit}>
                <div class='form-group'>
                  <input
                    onChange={this.onChange}
                    type='text'
                    class='form-control'
                    name='name'
                    placeholder='name'
                    required
                  />
                </div>
                <div class='form-group'>
                  <input
                    onChange={this.onChange}
                    type='email'
                    class='form-control'
                    name='email'
                    placeholder='email'
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
                <div style={{ color: '#ff0000' }}>{display_msg}</div>
                <button type='submit' class='btn btn-primary'>
                  Signup
                </button>
                <div>
                  Already have an account? <Link to='/login'>Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// CustomersSignup.propTypes = {
//   customersSignup: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   user: state.signup.user,
// });

// export default connect(mapStateToProps, { customersSignup })(CustomersSignup);

export default graphql(addCustomerMutation, { name: 'addCustomerMutation' })(
  CustomersSignup
);
