import axios from 'axios';
import API_URL from '../common/config';
import authHeader from './auth-header';
import store from '../store/index';

const UserService = {
  getAllUsers() {
    if (store.state.auth.user) {
      return axios.get(API_URL + '/users', { headers: { 'x-access-token': store.state.auth.user.accessToken } });
    }
    return axios.get(API_URL + '/users', { headers: authHeader });
  },
  deleteUserById(userId) {
    return axios.delete(API_URL + `/users/${userId}`, {
      headers: authHeader,
    });
  },
  createUser(user) {
    return axios.post(API_URL + '/users', user, {
      headers: authHeader,
    });
  },
  getUser(userId) {
    return axios.get(API_URL + `/users/${userId}`, {
      headers: authHeader,
    });
  },
  updateUser(userInfo, userId) {
    return axios.get(API_URL + `/users/${userId}`, userInfo, {
      headers: authHeader,
    });
  }
}

export default UserService;