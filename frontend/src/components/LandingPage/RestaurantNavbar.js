import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class RestaurantNavbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='collapse navbar-collapse' id='navbarNav'>
        <ul class='navbar-nav'>
          <li class='nav-item active'>
            <Link class='nav-link' to='/restaurantProfile'>
              Home{' '}
            </Link>
          </li>
          <li class='nav-item'>
            <Link class='nav-link' to='/restaurantprofileupdate'>
              Update Profile
            </Link>
          </li>
          <li class='nav-item'>
            <Link class='nav-link' to='/menuUpdate'>
              Update Menu
            </Link>
          </li>
          {/* <li class='nav-item'>
            <Link class='nav-link' to='/eventView'>
              Events
            </Link>
          </li> */}
          {/* <li class='nav-item'>
            <Link class='nav-link' to='/postEvent'>
              Add Event
            </Link>
          </li> */}
          <li class='nav-item'>
            <Link class='nav-link' to='/restaurantViewOrders'>
              Orders
            </Link>
          </li>
          {/* <li class='nav-item'>
            <Link class='nav-link' to='/allCustomers'>
              Customers List
            </Link>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default RestaurantNavbar;
