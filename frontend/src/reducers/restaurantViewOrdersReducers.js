import { ORDERS_VIEW } from '../actions/types';
import { REVIEW_VIEW } from '../actions/types';
import { MENU_VIEW } from '../actions/types';



const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  console.log("Restaurant reducer is", action)
  if (action.type === ORDERS_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === REVIEW_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === MENU_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  
  return state;
}
