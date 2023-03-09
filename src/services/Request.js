import axios from 'axios';
import { appConfig } from '../infrastructure/appManager';
import UserService from './UserService';

const call_api = ({ url, method, data, params }) => {
  return axios.create({
    baseURL: appConfig.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${UserService.getToken()}`,
    },
  })({
    method,
    url,
    data,
    params,
  });
};

export default call_api;
