import { GET_RESTAURANT_LIST } from '../actions/types';
import { GET_CUSTOMER_INFO } from '../actions/types';
import { CUSTOMER_PROFILE_UPDATE } from '../actions/types';
import { REGISTERED_EVENT_VIEW } from '../actions/types';
import { ONE_RESTAURANT_VIEW } from '../actions/types';
import { CUSTOMER_ADD_REVIEW } from '../actions/types';
import { GET_RESTAURANT_REVIEW, ORDER_PLACED } from '../actions/types';
import { GET_ORDERS, GET_RESTAURANT_CHAT, GET_RESTAURANT_MENU} from '../actions/types';

const initialState = {
  user: {},
  resInfo:{},
  menu: {},
  order: {}

};

export default function (state = initialState, action) {
  console.log("Customer reducer is", action)
  if (action.type === GET_RESTAURANT_LIST) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_CUSTOMER_INFO) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === CUSTOMER_PROFILE_UPDATE) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === REGISTERED_EVENT_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === ONE_RESTAURANT_VIEW) {
    return {
      ...state,
      resInfo: action.payload,
    };
  }
  if (action.type === CUSTOMER_ADD_REVIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_RESTAURANT_REVIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_ORDERS) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_RESTAURANT_CHAT) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_RESTAURANT_MENU) {
    return {
      ...state,
      menu: action.payload,
    };
  }
  if (action.type === ORDER_PLACED) {
    return {
      ...state,
      order: action.payload,
    };
  }
  return state;
}
