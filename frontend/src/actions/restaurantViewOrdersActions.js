import axios from 'axios';
import { ORDERS_VIEW } from './types';
import backendServer from '../config';


export const restaurantViewOrders = (cusid) => (dispatch) => {
  axios.defaults.withCredentials = true;
  const id = localStorage.getItem('restaurant_id')
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get(`${backendServer}/restaurants/${id}/orders`)
    .then((response) => dispatch({
      type: ORDERS_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ORDERS_VIEW,
          payload: error.response.data,
        });
      }
    });
};
