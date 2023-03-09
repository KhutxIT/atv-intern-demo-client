import moment from 'moment';
import { toast } from 'react-toastify';
import call_api from '../services/Request';

export const alertSuccess = (message) => {
  toast.success(message);
};

export const alertError = (message) => {
  toast.error(message);
};

export const toLocaleDateHHMM = (date) => {
  return moment(date).format('DD/MM/YYYY hh:mm');
};

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return call_api({
    url: '/v1/medias',
    method: 'POST',
    data: formData,
  });
};
