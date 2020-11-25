import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {login} from '../../actions/customerLoginActions';
const jwt_decode = require('jwt-decode');

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        super(props);
        //maintain the state required for this component
        this.state = {
            // cust_username : "",
            // cust_password : "",
            // cust_authFlag : false,
            // cust_err: ""
        }
    }
        componentWillReceiveProps(props){
            this.setState({
                token: props.user.updatedList.token
            })
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
                username: this.state.username,
                password: this.state.password
            }
        
            console.log("data:", data)
            this.props.login(data);
        
            this.setState({
                signupFlag: 1
            });
        }
        //Bind the handlers to this class
        // this.cust_usernameChangeHandler = this.cust_usernameChangeHandler.bind(this);
        // this.cust_passwordChangeHandler = this.cust_passwordChangeHandler.bind(this);
        // this.submitLogin = this.submitLogin.bind(this);
    
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false,
    //         err: ""
    //     })
    // }
    //username change handler to update state variable with the text entered by the user
    // cust_usernameChangeHandler = (e) => {
    //     this.setState({
    //         username : e.target.value
    //     })
    // }
    //password change handler to update state variable with the text entered by the user
    // cust_passwordChangeHandler = (e) => {
    //     this.setState({
    //         password : e.target.value
    //     })
    // }
    //submit Login handler to send a request to the node backend
    // submitLogin = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         username : this.state.username,
    //         password : this.state.password
    //     }
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post(`${backendServer}/customers/validate`,data)
    //         .then(response => {
    //             console.log(response.data)
    //             console.log("Status Code : ",response.status);
    //             if(response.status === 200){
    //                 localStorage.setItem('customer_id', response.data.id)
    //                 localStorage.setItem('customer_name', response.data.name)
    //                 localStorage.setItem('type', "customer")
    //                 this.setState({
    //                     authFlag : true,
    //                     err: response.data                       
    //                 })
    //             }else{
    //                 this.setState({
    //                     authFlag : false,
    //                     invalid: true
    //                 })
    //             }
                
    //         })
    //         .catch(err => {
    //                 this.setState({
    //                     authFlag : false,
    //                     invalid: true
    //                 })
    //         })
    // }

    render(){
        //redirect based on successful login
        // let redirectVar = null;    
        // let message = ""
        // if(this.state.authFlag){
        //     redirectVar = <Redirect to= "/customerHome"/>
        // } else if (this.state.invalid) {
        //     message = "Invalid username or password"
        // }

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
            localStorage.setItem('customer_id', this.props.user.updatedList._id)
            localStorage.setItem('customer_name', this.props.user.updatedList.name)
            localStorage.setItem('type', "customer")
            
            alert("Logged in successfully");
            redirectVar = <Redirect to="/customerHome" />
        }
        else if (this.props.user.updatedList && this.props.user.updatedList.status === "INVALID_CREDENTIALS" && this.state.signupFlag){
            message = "Invalid username or password"
        }


        return(
            <div>
                {redirectVar}
                <div >
                            <div class="main-div">
                                <div class="panel">
                            
                            <h2>Customer Login</h2>
                            <p>Please enter your username and password</p>
                            
                        </div>
                        <form onSubmit={this.onSubmit}>                        
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" class="form-control" name="username" placeholder="Username" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <div style={{ color: "#ff0000" }}>{message}</div>
                            <button type="submit" class="btn btn-primary">Login</button>                 
                            <div class="signup-section">
                                
                                <div>
                                    <p>Don't have an account?
                                        <Link to='/CustomersSignup'>   Signup here</Link>
                                    </p>
                                    <p>
                                        <Link to="/RestaurantsLogin">Restaurant? Click here to sign in</Link>
                                    </p>
                                    </div>
                                </div>
                        </form>

                    </div>
                    
                </div>
                
                {/* <div class="restaurant-form"> <RestaurantsLogin /></div> */}
            </div>
        )
    }
}
//export Login Component
// export default Login;

Login.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.login.user
});
export default connect(mapStateToProps, { login })(Login);