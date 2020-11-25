import axios from 'axios';
import { ONE_CUSTOMER_VIEW } from './types';
import backendServer from '../config';


export const oneEventAttendeeView = (cusid) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/customers/${cusid}/profile`)
    .then((response) => dispatch({
      type: ONE_CUSTOMER_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ONE_CUSTOMER_VIEW,
          payload: error.response.data,
        });
      }
    });
};
