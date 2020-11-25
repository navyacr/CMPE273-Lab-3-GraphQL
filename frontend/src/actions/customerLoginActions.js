import axios from 'axios';
import { CUSTOMER_LOGIN } from './types';
import backendServer from '../config'

export const login = (loginData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendServer}/customers/validate`, loginData)
    .then((response) => dispatch({
      type: CUSTOMER_LOGIN,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMER_LOGIN,
          payload: error.response.data,
        });
      }
    });
};
