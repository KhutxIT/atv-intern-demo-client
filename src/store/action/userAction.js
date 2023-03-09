import Notification from '../../utils/notification';
import UserService from '../../services/UserService';
import { postActionType } from './postAction';

export const userActionType = {
  SET_USER: 'set_USER',
  UPDATE_USER: 'update_USER',
  NEW_FRIEND_REQUEST: 'new_FRIEND_REQUEST',
  REMOVE_FRIEND_REQUEST: 'remove_FRIEND_REQUEST',
  GET_USER_REQUEST: 'get_USER_REQUEST',
  USER_UPDATE_PROFILEPICTURE_SUCCESS: 'user_UPDATE_PROFILEPICTURE_SUCCESS',
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',

  GETUSER_REQUEST: 'USER_GETUSER_REQUEST',
  GETUSER_SUCCESS: 'USER_GETUSER_SUCCESS',
  GETUSER_FAILURE: 'USER_GETUSER_FAILURE',

  DELETE_REQUEST: 'USERS_DELETE_REQUEST',
  DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
  DELETE_FAILURE: 'USERS_DELETE_FAILURE',

  USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
  USER_UPDATE_FAILURE: 'USER_UPDATE_FAILURE',

  USER_LIKE_COMMENT: 'USER_LIKE_COMMENT',
  USER_DISLIKE_COMMENT: 'USER_DISLIKE_COMMENT',

  USER_DISLIKE_POST: 'USER_DISLIKE_POST',
  USER_LIKE_POST: 'USER_LIKE_POST',

  USER_LIKE_COMMENT_REPLY: 'USER_LIKE_COMMENT_REPLY',
  USER_DISLIKE_COMMENT_REPLY: 'USER_DISLIKE_COMMENT_REPLY',

  GET_USERPROFILE_DATA_REQUEST: 'GET_USERPROFILE_DATA_REQUEST',
  GET_USERPROFILE_DATA: 'GET_USERPROFILE_DATA',
  GET_USERPROFILE_DATA_FAILURE: 'GET_USERPROFILE_DATA_FAILURE',

  GET_USER_PROFILE_FOLLOWINGS: 'GET_USER_PROFILE_FOLLOWINGS',
  GET_USER_PROFILE_FOLLOWERS: 'GET_USER_PROFILE_FOLLOWERS',

  GET_USER_FOLLOWINGS: 'GET_USER_FOLLOWINGS',
  GET_USER_FOLLOWERS: 'GET_USER_FOLLOWERS',

  FOLLOW_USER: 'FOLLOW_USER',
  UNFOLLOW_USER: 'UNFOLLOW_USER',

  GET_POSTS: 'GET_POSTS',
  GET_USER_PROFILE_POSTS: 'GET_USER_PROFILE_POSTS',

  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_RESPONSE: 'PASSWORD_RESET_RESPONSE',

  GET_NEW_USERS_SUCCESS: 'GET_NEW_USERS_SUCCESS',
  GET_NEW_USERS_REQUEST: 'GET_NEW_USERS_REQUEST',
  NEW_USER: 'NEW_USER',
};

export const updateUser = (user) => (dispatch) => {
  UserService.updateProfile(user)
    .then((res) => {
      dispatch(receiveUpdateUser(res.data?.data));
      Notification.success('Cập nhật thông tin cá nhân thành công');
    })
    .catch(({ response }) => {
      console.log(response.data);
      Notification.failure(response.data?.message);
    });
};

export const updateUser2 = (user) => (dispatch) => {
  dispatch(receiveUpdateUser(user));
};

export const updateUserFromSocketCallback = (user) => (dispatch) => {
  dispatch(receiveUpdateUser(user));
};

export const setPersonalData = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    UserService.getPersonalData()
      .then((res) => {
        if (res.data?.data && res.status === 200) {
          dispatch(receiveSetUser(res.data?.data));
          resolve();
        } else {
          reject();
        }
      })
      .catch(({ response }) => {
        console.log(response.data);
        reject();
      });
  });
};

export const getMorePosts = (userId, lastPostId) => {
  return (dispatch) => {
    UserService.getPosts(userId, lastPostId).then((res) => {
      res.data?.data?.forEach((post) =>
        dispatch({ type: postActionType.INIT_COMMENT, postId: post._id }),
      );
    });
  };
};

export const receiveSetUser = (user) => ({
  type: userActionType.SET_USER,
  payload: user,
});

export const receiveUpdateUser = (data) => ({
  type: userActionType.UPDATE_USER,
  payload: data,
});

export const receiveNewFriendRequest = () => ({
  type: userActionType.NEW_FRIEND_REQUEST,
});

export const receiveRemoveFriendRequest = () => ({
  type: userActionType.REMOVE_FRIEND_REQUEST,
});
