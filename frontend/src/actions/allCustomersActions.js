import axios from 'axios';
import { CUSTOMERS_VIEW, GET_MESSAGE, SEND_MESSAGE } from './types';
import backendServer from '../config'

export const customersView = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/customers/allCustomers`)
    .then((response) => dispatch({
      type: CUSTOMERS_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMERS_VIEW,
          payload: error.response.data,
        });
      }
    });
};

export const getMessages = (payload) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(`${backendServer}/restaurants/getMessage`, payload)
    .then((response) => dispatch({
      type: GET_MESSAGE,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_MESSAGE,
          payload: error.response.data.updatedList,
        });
      }
    });
};

export const sendMessages = (payload) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(`${backendServer}/restaurants/message`, payload)
    .then((response) => dispatch({
      type: SEND_MESSAGE,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: SEND_MESSAGE,
          payload: error.response.data.updatedList,
        });
      }
    });
};