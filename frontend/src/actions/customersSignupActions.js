import axios from 'axios';
import { CUSTOMER_SIGNUP } from './types';
import backendServer from '../config';

export const customersSignup = (customersData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendServer}/customers/info`,customersData)
    .then((response) => {
      console.log("Actions response: ", response)
      dispatch({
        type: CUSTOMER_SIGNUP,
        payload: response.data,
        // resid : response.data.id,
      })
    
  })
    .catch((error) => {
      if (error.response && error.response.data) {
        
        return dispatch({
          type: CUSTOMER_SIGNUP,
          payload: error.response.data,
          
        });
      }
    });

    
};
