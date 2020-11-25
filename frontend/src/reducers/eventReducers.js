import { POST_EVENT } from '../actions/types';


const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  if (action.type === POST_EVENT) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
