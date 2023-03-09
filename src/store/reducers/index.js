import { combineReducers } from 'redux';
import socket from './socketReducer';
import user from './userReducer';
import alert from './alertReducer';
import postUpload from './postUploadReducer';
import comments from './commentReducer';
import post from './postReducer';
import notification from './notificationReducer';
import chat from './chatReducer';

export default combineReducers({
  socket,
  user,
  alert,
  postUpload,
  comments,
  post,
  notification,
  chat,
});
