import axios from 'axios';
import { EVENT_VIEW } from './types';
import backendServer from '../config'

export const eventView = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/events/info`)
    .then((response) => dispatch({
      type: EVENT_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: EVENT_VIEW,
          payload: error.response.data,
        });
      }
    });
};
