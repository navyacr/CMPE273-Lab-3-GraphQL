import axios from 'axios';
import { ONE_EVENT_VIEW } from './types';
import backendServer from '../config'

export const oneEventView = (eventid) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/events/${eventid}/attendees`)
    .then((response) => dispatch({
      type: ONE_EVENT_VIEW,
      payload: response.data.updatedList.attendees,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ONE_EVENT_VIEW,
          payload: error.response.data,
        });
      }
    });
};
