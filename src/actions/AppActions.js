import _ from 'lodash/fp';
import axios from 'axios';
import { LOGIN, SET_CURRENT_USER, LOGOUT } from '../actionTypes/appTypes';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
const goTo = (history, route) => {
  history.push(route);
};

const getActualRoute = history => {
  const { location } = history;
  return location.pathname;
};

const getContainerRect = (container) => {
  return _.flow(
    _.result('getBoundingClientRect'),
    _.defaultTo({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    })
  )(container)
}


const signIn = data => dispatch => new Promise((resolve, reject) => {
  axios.post('/api/auth/signin/', data)
    .then((response) => {
      const { token, user } = response.data;
      setAuthorizationToken(token)
      dispatch({
        type: LOGIN,
      });
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      });
      resolve();
    })
    .catch((err) => {
      reject();
    })
});

const Logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  localStorage.removeItem('jwtToken');
  window.location = '/login';
};

export {
  goTo,
  getActualRoute,
  getContainerRect,
  signIn,
  Logout,
};
