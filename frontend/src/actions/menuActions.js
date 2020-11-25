import axios from 'axios';
import { MENU_UPDATE } from './types';
import backendServer from '../config'

export const menuUpdate = (menuData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  const name = menuData.name
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(`${backendServer}/restaurants/${name}/dishes`, menuData)
    .then((response) => dispatch({
      type: MENU_UPDATE,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: MENU_UPDATE,
          payload: error.response.data,
        });
      }
    });
};
