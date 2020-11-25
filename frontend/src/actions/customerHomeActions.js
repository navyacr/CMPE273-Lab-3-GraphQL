import axios from 'axios';
import { GET_RESTAURANT_LIST } from './types';
import { GET_CUSTOMER_INFO } from './types';
import { CUSTOMER_PROFILE_UPDATE } from './types';
import { REGISTERED_EVENT_VIEW } from './types';
import { ONE_RESTAURANT_VIEW } from './types';
import { CUSTOMER_ADD_REVIEW } from './types';
import { GET_RESTAURANT_REVIEW, ORDER_PLACED } from './types';
import { GET_ORDERS, GET_RESTAURANT_CHAT, GET_RESTAURANT_MENU} from './types';

import backendServer from '../config'
const id = localStorage.getItem('customer_id');

export const getRestaurants = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/restaurants/info`)
    .then((response) => dispatch({
      type: GET_RESTAURANT_LIST,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_RESTAURANT_LIST,
          payload: error.response.data,
        });
      }
    });
};

export const getCustomerInfo = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/customers/${id}/profile`)
    .then((response) => dispatch({
      type: GET_CUSTOMER_INFO,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_CUSTOMER_INFO,
          payload: error.response.data,
        });
      }
    });
};

export const customerProfileUpdate = (data) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(`${backendServer}/customers/${id}/infoUpdate`, data)
    .then((response) => dispatch({
      type: CUSTOMER_PROFILE_UPDATE,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMER_PROFILE_UPDATE,
          payload: error.response.data,
        });
      }
    });
};

export const getEvents = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/events/${id}/eventList`)
    .then((response) => dispatch({
      type: REGISTERED_EVENT_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: REGISTERED_EVENT_VIEW,
          payload: error.response.data,
        });
      }
    });
};

export const getRestaurantInfo = (resId) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/restaurants/${resId}/info`)
    .then((response) => dispatch({
      type: ONE_RESTAURANT_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ONE_RESTAURANT_VIEW,
          payload: error.response.data,
        });
      }
    });
};

export const submitReview = (data) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(`${backendServer}/customers/${id}/reviews`,data)
    .then((response) => dispatch({
      type: CUSTOMER_ADD_REVIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMER_ADD_REVIEW,
          payload: error.response.data,
        });
      }
    });
};

export const getReviews = (resId) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/restaurants/${resId}/info`)
    .then((response) => dispatch({
      type: GET_RESTAURANT_REVIEW,
      payload: response.data.updatedList.reviews,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_RESTAURANT_REVIEW,
          payload: error.response.data,
        });
      }
    });
};

export const getOrders = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/customers/${id}/orders`)
    .then((response) => dispatch({
      type: GET_ORDERS,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_ORDERS,
          payload: error.response.data,
        });
      }
    });
};

export const getChatRestaurants = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/customers/${id}/getChatRestaurants`)
    .then((response) => dispatch({
      type: GET_RESTAURANT_CHAT,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_RESTAURANT_CHAT,
          payload: error.response.data,
        });
      }
    });
};

export const getRestaurantMenu = (resId) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/restaurants/${resId}/dishes`)
    .then((response) => dispatch({
      type: GET_RESTAURANT_MENU,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_RESTAURANT_MENU,
          payload: error.response.data,
        });
      }
    });
};

export const placeOrder = (orderData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/customers/${id}/orders`, orderData)
    .then((response) => dispatch({
      type: ORDER_PLACED,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ORDER_PLACED,
          payload: error.response.data,
        });
      }
    });
};