import axios from 'axios';
import { RESTAURANT_LOGIN } from './types';
import backendServer from '../config'

export const restaurantsLogin = (loginData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendServer}/restaurants/validate`, loginData)
    .then((response) => dispatch({
      type: RESTAURANT_LOGIN,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: RESTAURANT_LOGIN,
          payload: error.response.data,
        });
      }
    });
};
