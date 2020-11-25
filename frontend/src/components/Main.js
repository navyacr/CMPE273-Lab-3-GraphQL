import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './LandingPage/Navbar';
import CustomersSignup from './Signup/customersSignup';
import restaurantsSignup from './Signup/restaurantsSignup';
import restaurantProfile from './restaurant/restaurantprofile';
import customerProfile from './customer/customerprofile';
import restaurantProfileUpdate from './restaurant/restaurantprofileupdate';
import restaurantMenu from './restaurant/menu';
import menuUpdate from './restaurant/menuUpdate';
import customerHome from './customer/customerHome';
import OneRestaurantView from './customer/oneRestaurantView';
import OneEventView from './restaurant/oneEventView';
import oneEventAttendeeView from './restaurant/oneEventAttendeeView'
import EventView from './restaurant/eventView';
import PostEvent from './restaurant/postEvent'
import ViewOrders from './customer/viewOrders';
import CustomerProfileUpdate from './customer/customerprofileupdate';
import EventRegister from './customer/eventRegister'
import RestaurantViewOrders from './restaurant/restaurantViewOrders';
import AllCustomers from './restaurant/allCustomers';
import ViewRegisteredEvents from './customer/viewRegisteredEvents';
import RestaurantsLogin from './Login/restaurantsLogin';
import oneCustomerView from './restaurant/oneCustomerView';
import messageTab from './customer/messageTab';

class Main extends Component {
  render() {
    return (
      <div>
        
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/customersSignup" component={CustomersSignup} />
        <Route path="/restaurantsSignup" component={restaurantsSignup} />
        <Route path="/restaurantProfile" component={restaurantProfile} />
        <Route path="/restaurantProfileUpdate" component={restaurantProfileUpdate} />
        <Route path="/restaurantMenu" component={restaurantMenu} />
        <Route path="/menuUpdate" component={menuUpdate} />
        <Route path="/customerProfile" component={customerProfile} />
        <Route path="/customerHome" component={customerHome} />
        <Route path="/oneRestaurantView/:resid" component={OneRestaurantView} />
        <Route path="/oneEventView/:eventid" component={OneEventView} />
        <Route path="/oneEventAttendeeView/:cusid" component={oneEventAttendeeView} />        
        <Route path="/eventView" component={EventView} />
        <Route path="/postEvent" component={PostEvent} />
        <Route path="/viewOrders" component={ViewOrders} />
        <Route path="/profileUpdate" component={CustomerProfileUpdate} />
        <Route path="/eventRegister" component={EventRegister} />
        <Route path="/restaurantViewOrders" component={RestaurantViewOrders} />
        <Route path="/viewRegisteredEvents" component={ViewRegisteredEvents} />
        <Route path="/restaurantsLogin" component={RestaurantsLogin} />
        <Route path="/allCustomers" component={AllCustomers} />
        <Route path="/oneCustomerView/:cusid" component={oneCustomerView} />        
        <Route path="/messageTab" component={messageTab} />        
      </div>
    );
  }
}
export default Main;
