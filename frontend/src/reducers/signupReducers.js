import { RESTAURANT_SIGNUP } from '../actions/types';
import { CUSTOMER_SIGNUP } from '../actions/types';

const initialState = {
  user: {},
};

// eslint-disable-next-line func-names
export default function (state = initialState, action) {
  // console.log("Restaurant action is", action)
  if (action.type === RESTAURANT_SIGNUP || action.type === CUSTOMER_SIGNUP) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
