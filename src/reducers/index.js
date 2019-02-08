import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import EventReducer from './eventReducer';
import AppReducer from './appReducer';

export default combineReducers({
  UserReducer,
  EventReducer,
  AppReducer,
});
