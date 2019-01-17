import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import EventReducer from './eventReducer';

export default combineReducers({
  UserReducer,
  EventReducer
});
