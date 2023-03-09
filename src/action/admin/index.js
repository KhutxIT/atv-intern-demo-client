import call_api from '../../services/Request';

const BASE_ADMIN_API = '/v1/admin';

export const getGeneralStats = () => {
  return call_api({
    url: `${BASE_ADMIN_API}/system/general`,
    method: 'GET',
  });
};

export const getDateStats = () => {
  return call_api({
    url: `${BASE_ADMIN_API}/system/date-stats`,
    method: 'GET',
  });
};

export const createNFT = (nft) => {
  return call_api({
    url: `${BASE_ADMIN_API}/nfts`,
    method: 'POST',
    data: nft,
  });
};

export const searchNFT = ({ query, offset, limit }) => {
  return call_api({
    url: `${BASE_ADMIN_API}/nfts`,
    method: 'GET',
    params: {
      query,
      offset,
      limit,
    },
  });
};
