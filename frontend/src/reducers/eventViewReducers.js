import { EVENT_VIEW } from '../actions/types';
import { ONE_EVENT_VIEW } from '../actions/types';
import { ONE_CUSTOMER_VIEW } from '../actions/types';



const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  console.log("Eventview reducer is", action)
  if (action.type === EVENT_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === ONE_EVENT_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === ONE_CUSTOMER_VIEW){
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
