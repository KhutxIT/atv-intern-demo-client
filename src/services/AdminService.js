import call_api from './Request';

const BASE_ADMIN_API = '/v1/admin';

export const updateAccountStatus = (_id, status) => {
  return call_api({
    url: `${BASE_ADMIN_API}/users/status`,
    method: 'PUT',
    data: {
      _id,
      status,
    },
  });
};
