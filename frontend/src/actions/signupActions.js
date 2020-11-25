import axios from 'axios';
import { RESTAURANT_SIGNUP } from './types';
import backendServer from '../config';

export const restaurantsSignup = (restaurantsData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendServer}/restaurants/info`, restaurantsData)
    .then((response) => {
    //  axios.post(`${backendServer}/restaurants/${response.data.id}/profile`, {location: restaurantsData.location})
    // .then((res) => {
      dispatch({
        type: RESTAURANT_SIGNUP,
        payload: response.data
        // resid : response.data.id,
      })
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        
        return dispatch({
          type: RESTAURANT_SIGNUP,
          payload: error.response.data,
          
        });
      }
    });

    
};
