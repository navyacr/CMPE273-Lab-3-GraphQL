import axios from 'axios';
import { REVIEW_VIEW } from './types';
import backendServer from '../config'

export const restaurantViewReview = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  const id = localStorage.getItem('restaurant_id')
  axios.get(`${backendServer}/customers/${id}/reviews`)
    .then((response) => dispatch({
      type: REVIEW_VIEW,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: REVIEW_VIEW,
          payload: error.response.data,
        });
      }
    });
};
