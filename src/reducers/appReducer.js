import { ERROR, LOGIN, SET_CURRENT_USER } from "../actionTypes/appTypes";

const initialState = {
  currentUser: {},
  logged: false,
  error: null,
};

const AppReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ERROR) {
    return {
      ...state,
      error: payload,
    };
  }
  if (type === LOGIN) {
    return {
      ...state,
      logged: true,
      error: null,
    };
  }
  if (type === SET_CURRENT_USER) {
    return {
      ...state,
      currentUser: payload,
      error: null,
    }
  }
  return state;
};

export default AppReducer;
