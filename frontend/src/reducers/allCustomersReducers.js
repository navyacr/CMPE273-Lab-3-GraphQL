import { CUSTOMERS_VIEW, GET_MESSAGE, SEND_MESSAGE} from '../actions/types';

const initialState = {
  user: {},
  messages: {},
  sent: {}
};

export default function (state = initialState, action) {
  console.log("Customerview reducer is", action)
  if (action.type === CUSTOMERS_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_MESSAGE) {
    return {
      ...state,
      messages: action.payload,
    };
  }
  if (action.type === SEND_MESSAGE) {
    return {
      ...state,
      sent: action.payload,
    };
  }
  return state;
}
