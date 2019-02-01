import { GET_EVENTS, ADD_EVENT, ERROR, UPDATE_EVENT } from "../actionTypes/eventTypes";

const initialState = {
  events: {},
  error: null,
};

const EventReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ERROR) {
    return {
      ...state,
      error: payload,
    };
  }

  if (type === GET_EVENTS) {
    return {
      ...state,
      error: null,
      events: payload,
    };
  }
  if (type === ADD_EVENT) {
    const newEvent = payload;
    return {
      ...state,
      events: {
        ...state.events,
        [newEvent._id]: newEvent,
      },
      error: null,
    }
  }
  if (type === UPDATE_EVENT) {
    const event = payload;
    return {
      ...state,
      events: {
        ...state.events,
        [event._id]: event,
      },
      error: null,
    };
  }
  return state;
};

export default EventReducer;
