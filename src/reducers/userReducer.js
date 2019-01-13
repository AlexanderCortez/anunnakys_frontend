import { GET_USERS, ERROR, ADD_USER, UPDATE_USER } from '../actionTypes/userTypes';

const initialState = {
  users: {},
  error: null,
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_USERS) {
    return {
      ...state,
      error: null,
      users: payload,
    };
  }

  if (type === ERROR) {
    return {
      ...state,
      error: payload,
    };
  }

  if (type === ADD_USER) {
    const newUser = payload;
    return {
      ...state,
      users: {
        ...state.users,
        [newUser.user_id]: newUser,
      },
      error: null,
    }
  }

  if (type === UPDATE_USER) {
    const user = payload;
    return {
      ...state,
      users: {
        ...state.users,
        [user.user_id]: user,
      },
      error: null,
    }
  }

  return state;
};

export default UserReducer;
