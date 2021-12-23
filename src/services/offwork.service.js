import axios from 'axios';
import API_URL from '../common/config';
import authHeader from './auth-header';

const OffworkService = {
  getAllOffworkByMonth(month, year) {
    return axios.get(API_URL + '/offworks/month-year', {
      headers: authHeader,
      params: {
        month: month,
        year: year
      }
    });
  },
  getAllOffWork() {
    return axios.get(API_URL + '/offworks', {
      headers: authHeader
    });
  }
}

export default OffworkService;