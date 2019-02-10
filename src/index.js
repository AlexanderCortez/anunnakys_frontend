import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { checkToken } from './helpers/checkToken';
import { LOGIN, SET_CURRENT_USER } from './actionTypes/appTypes';

axios.defaults.baseURL = 'http://localhost:3001'

checkToken()
  .then(({ user }) => {
    store.dispatch({
      type: LOGIN,
    });
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
    renderDOM();
  })
  .catch(() => {
    renderDOM();
  });

const renderDOM = () => ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
