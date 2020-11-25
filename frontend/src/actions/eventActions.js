import axios from 'axios';
import { POST_EVENT } from './types';
import backendServer from '../config'

export const postEvent = (eventData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(`${backendServer}/events/info`, eventData)
    .then((response) => dispatch({
      type: POST_EVENT,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: POST_EVENT,
          payload: error.response.data,
        });
      }
    });
};
