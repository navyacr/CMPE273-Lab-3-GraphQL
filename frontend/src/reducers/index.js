import { combineReducers } from 'redux';
import signupReducers from './signupReducers';
import loginReducers from './loginReducers';
import restaurantProfileReducers from './restaurantProfileReducers';
import getRestaurant from './restaurantProfileReducers';
import postEvent from './eventReducers';
import menuUpdate from './menuReducers';
import eventView from './eventViewReducers';
import oneEventView from './eventViewReducers';
import oneEventAttendeeView from './eventViewReducers';
import restaurantViewOrders from './restaurantViewOrdersReducers';
import restaurantViewReview from './restaurantViewOrdersReducers';
import restaurantMenu from './restaurantViewOrdersReducers';
import customersView from './allCustomersReducers';
import getMessages from './allCustomersReducers';
import getRestaurants from './customerHomeReducers';
import getCustomerInfo from './customerHomeReducers';
import customerProfileUpdate from './customerHomeReducers';
import getEvents from './customerHomeReducers';
import getRestaurantInfo from './customerHomeReducers';
import submitReview from './customerHomeReducers';
import getReviews from './customerHomeReducers';
import getOrders from './customerHomeReducers';
import getChatRestaurants from './customerHomeReducers';
import sendMessages from './allCustomersReducers';
import getRestaurantMenu from './customerHomeReducers';
import placeOrder from './customerHomeReducers'

export default combineReducers({
  login: loginReducers,
  signup: signupReducers,
  restaurantProfileUpdate: restaurantProfileReducers,
  menuUpdate: menuUpdate,
  postEvent: postEvent,
  eventView: eventView,
  oneEventView: oneEventView,
  oneEventAttendeeView: oneEventAttendeeView,
  restaurantViewOrders: restaurantViewOrders,
  restaurantViewReview: restaurantViewReview,
  restaurantMenu: restaurantMenu,
  getRestaurant: getRestaurant,
  customersView : customersView,
  getMessages: getMessages,
  getRestaurants: getRestaurants,
  getCustomerInfo: getCustomerInfo,
  customerProfileUpdate: customerProfileUpdate,
  getEvents: getEvents,
  getRestaurantInfo: getRestaurantInfo,
  submitReview: submitReview,
  getReviews: getReviews,
  getOrders: getOrders,
  getChatRestaurants: getChatRestaurants,
  sendMessages: sendMessages,
  getRestaurantMenu: getRestaurantMenu,
  placeOrder: placeOrder
});
