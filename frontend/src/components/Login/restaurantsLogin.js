import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {restaurantsLogin} from '../../actions/loginActions';
const jwt_decode = require('jwt-decode');

class RestaurantsLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {};
      } 

    // componentWillReceiveProps(props){
    // this.setState({
    //     token: props.user.updatedList.token
    // })
    // }
      onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
      }
      onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
    
        console.log("data:", data)
        this.props.restaurantsLogin(data);
    
        this.setState({
            signupFlag: 1
        });
      }
      render() {
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        console.log("Props user value")
        console.log(this.props)
        if (this.props.user.updatedList && this.props.user.updatedList.status === "SUCCESS" && this.state.signupFlag) {
            localStorage.setItem('token', this.props.user.updatedList.token)
            var test = localStorage.getItem('token')
            console.log("Token: ", test)
            var decoded = jwt_decode(this.props.user.updatedList.token.split(' ')[1]);
            console.log("id and name from token: ", decoded._id + decoded.username + decoded.type)
            localStorage.setItem('restaurant_id', this.props.user.updatedList._id)
            localStorage.setItem('restaurant_name', this.props.user.updatedList.name)
            localStorage.setItem('type', "restaurant")
            
            alert("Logged in successfully");
            redirectVar = <Redirect to="/restaurantProfile" />
        }
        else if (this.props.user.updatedList && this.props.user.updatedList.status === "INVALID_CREDENTIALS" && this.state.signupFlag){
            message = "Invalid username or password"
        }
        return (
            <div >
                {redirectVar}
                        <div >
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Restaurant Login</h2>
                                    <p>Please enter your username and password</p>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    
                                    <div class="form-group">
                                        <input type="email" class="form-control" name="username" onChange={this.onChange} placeholder="Username"  title="email address" required />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                    </div>
                                    <div style={{ color: "#ff0000" }}>{message}</div>
                                    <button type="submit" class="btn btn-primary">Login</button>
                                    <div>
                                        <p>
                                            Don't have an account? <Link to='/restaurantsSignup'>   Signup here</Link>
                                        </p>
                                        <p>
                                            <Link to="/login">Customer? Click here to sign in</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        
                    </div>
        </div>
        )
      }
}

RestaurantsLogin.propTypes = {
    restaurantsLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.login.user
});
export default connect(mapStateToProps, { restaurantsLogin })(RestaurantsLogin);