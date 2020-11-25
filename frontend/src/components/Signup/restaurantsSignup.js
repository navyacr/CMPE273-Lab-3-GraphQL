import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {restaurantsSignup} from '../../actions/signupActions'

class RestaurantsSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  } 
  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        location: this.state.location
    }

    this.props.restaurantsSignup(data);

    this.setState({
        signupFlag: 1
    });
  }

  render() {
    //redirect based on successful signup
    let redirectVar = null;
    let message = "";
    console.log("Props user value")
    console.log(this.props.user.message)
    if (this.props.user.updatedList && this.props.user.updatedList.status === "SUCCESS" && this.state.signupFlag) {
        alert("Registered successfully");
        redirectVar = <Redirect to="/restaurantsLogin" />
    }
    else if (this.props.user.updatedList && this.props.user.updatedList.status === "error" && this.state.signupFlag){
        message = "Email id is already registered"
    }
    return (
        <div>
            {redirectVar}
            <Row>
            <Col>
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Enter the details for Restaurant Signup</h2>
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Name" required />
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" name="email" onChange={this.onChange} placeholder="Email Id"  title="email address" required />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" name="location" onChange={this.onChange} placeholder="Address" required />
                                </div>
                                <div style={{ color: "#ff0000" }}>{message}</div><br />
                                <button type="submit" class="btn btn-primary">Signup</button><br /><br />
                                <div>Already have an account? <Link to='/login'>Login</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    )
  }
}

RestaurantsSignup.propTypes = {
    restaurantsSignup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.signup.user
});

export default connect(mapStateToProps, { restaurantsSignup })(RestaurantsSignup);