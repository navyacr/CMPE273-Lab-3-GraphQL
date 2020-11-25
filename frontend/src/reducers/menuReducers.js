import { MENU_UPDATE } from '../actions/types';


const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  if (action.type === MENU_UPDATE) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
