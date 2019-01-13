import axios from 'axios';
import _ from 'lodash';

import { GET_USERS, ERROR, ADD_USER, UPDATE_USER } from '../actionTypes/userTypes';

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
}

const getUsers = forceFetch => (dispatch, getState) => new Promise((resolve, reject) => {
  const sizeOfUsers = _.size(getState().UserReducer.users);
  if (sizeOfUsers === 0 || forceFetch) {
    axios.get('/api/user/')
    .then((response) => {
        const users = _.keyBy(response.data.users, 'user_id');
        dispatch(getAction(GET_USERS, users));
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

const addUser = data => dispatch => new Promise((resolve, reject) => {
  axios.post('/api/user', data)
    .then((response) => {
      const user = response.data.user;
      dispatch(getAction(ADD_USER, user));
      resolve();
    })
    .catch((err) => {
      dispatch(getErrorMessage(err));
      reject();
    });
});

const updateUser = data => dispatch => new Promise((resolve, reject) => {
  const { id } = data;
  axios.put(`/api/user/${id}`, data)
    .then((response) => {
      const { user, messsage } = response.data;
      dispatch(getAction(UPDATE_USER, user));
      resolve(messsage);
    })
    .catch((err) => {
      dispatch(getErrorMessage(err));
      reject();
    });
});

const deleteUser = data => dispatch => new Promise((resolve, reject) => {
  const { id } = data;
  axios.delete(`/api/user/${id}`)
    .then(() => {
      dispatch(getUsers(true));
      resolve();
    })
    .catch((err) => {
      dispatch(getErrorMessage(err));
      reject();
    });
});

export {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
