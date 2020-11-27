import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RestaurantNavbar from './RestaurantNavbar';
import CustomerNavbar from './CustomerNavbar';
import '../../App.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem('restaurant_id');
    localStorage.removeItem('customer_id');
    localStorage.removeItem('type');
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (localStorage.getItem('type')) {
      console.log('Able to read cookie');
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <Link to='/login' onClick={this.handleLogout}>
              <span class='glyphicon glyphicon-user'></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log('Not Able to read cookie');
      navLogin = (
        <div class='collapse navbar-collapse' id='navbarNav'>
          <ul class='nav navbar-nav navbar-right'>
            <li>
              <Link to='/login'>
                <span class='glyphicon glyphicon-log-in'></span> Login
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    let redirectVar = null;
    // var component = <RestaurantNavbar />;
    var component = '';
    if (localStorage.getItem('type') == 'restaurant') {
      component = <RestaurantNavbar />;
    } else if (localStorage.getItem('type') == 'customer') {
      component = <CustomerNavbar />;
    }
    return (
      <div>
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
          <img
            class='logo'
            src='https://cdn.vox-cdn.com/thumbor/SSO7TuKS-yPIHqZqC54ecY_y4uI=/0x0:1100x733/1400x1050/filters:focal(0x0:1100x733):format(jpeg)/cdn.vox-cdn.com/assets/884081/Yelp_Logo_No_Outline_Color-01.jpg'
          ></img>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          {component}
          {navLogin}
        </nav>
      </div>
    );
  }
}

export default Navbar;
