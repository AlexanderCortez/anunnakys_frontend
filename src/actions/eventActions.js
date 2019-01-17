import axios from 'axios';
import _ from 'lodash';

import { GET_EVENTS, ERROR, ADD_EVENT } from "../actionTypes/eventTypes";

const getAction = (type, payload) => ({
  type,
  payload,
});

const getErrorMessage = (err) => {
  let error = '';
  if (err.response) {
    error = err.response.data.error;
  } else {
    error = err.toString();
  }
  return getAction(ERROR, error);
};

const getEvents = forceFetch => (dispatch, getState) => new Promise((resolve, reject) => {
  const sizeOfEvents = _.size(getState().EventReducer.events);
  if (sizeOfEvents === 0) {
    axios.get('/api/event/')
      .then((response) => {
        const events = _.keyBy(response.data.events, '_id');
        dispatch(getAction(GET_EVENTS, events));
        resolve()
      })
      .catch((err) => {
        dispatch(getErrorMessage(err));
        reject();
      });
  } else {
    resolve();
  }
});

const addEvent = (data) => dispatch => new Promise((resolve, reject) => {
  axios.post('/api/event/', data)
    .then((response) => {
      const event = response.data.event;
      dispatch(getAction(ADD_EVENT, event));
      resolve();
    })
    .catch((err) => {
      dispatch(getErrorMessage(err));
      reject();
    });
});

export {
  getEvents,
  addEvent,
};
