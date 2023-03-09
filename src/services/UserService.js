import call_api from './Request';

const USER_API_ROUTE_V1 = '/v1/users';
const USER_API_ROUTE_V2 = '/v2/users';

const getToken = () => localStorage.getItem('token');

const login = (username, password) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/login`,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};

const signup = (user) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/signup`,
    method: 'POST',
    data: user,
  });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.replace('/');
};

const getUser = (id) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/${id}`,
    method: 'GET',
  });
};

const getProfile = () => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/profile`,
    method: 'GET',
  });
};

const updateProfile = (user) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/profile`,
    method: 'PUT',
    data: user,
  });
};

const searchUser = ({ query, offset, limit }) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/search`,
    method: 'GET',
    params: {
      query,
      offset,
      limit,
    },
  });
};

const searchUserByName = ({ query, offset, limit }) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/search/name`,
    method: 'GET',
    params: {
      query,
      offset,
      limit,
    },
  });
};

const searchUserByUsername = ({ query, offset, limit }) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/search/username`,
    method: 'GET',
    params: {
      query,
      offset,
      limit,
    },
  });
};

const countSearch = ({ query }) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/count`,
    method: 'GET',
    params: {
      query,
    },
  });
};

const follow = (userFollowId, userFollowedId) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/follows`,
    method: 'POST',
    data: {
      userFollowedId,
      userFollowId: userFollowId,
    },
  });
};

const unFollow = (userFollowId, userFollowedId) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/follows`,
    method: 'PUT',
    data: {
      userFollowedId,
      userFollowId: userFollowId,
    },
  });
};

const getFollowingList = (_id) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/${_id}/followings`,
    method: 'GET',
  });
};

const getFollowerList = (_id) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/${_id}/followers`,
    method: 'GET',
  });
};

const getFriendList = (_id) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/friends/${_id}`,
    method: 'GET',
  });
};

const getUserSentFriendRequest = () => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/friendrequests`,
    method: 'GET',
  });
};

const getFriendRequestSentList = () => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/friendrequestssent`,
    method: 'GET',
  });
};

const confirmFriendRequest = (userSentFriendRequestId) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/friendrequests`,
    method: 'POST',
    params: {
      userSentFriendRequestId,
    },
  });
};

const unFriend = (userUnFriended) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/friends`,
    method: 'DELETE',
    params: {
      userUnFriended,
    },
  });
};

const rejectFriendRequest = (userSentFriendRequestId) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/friendrequests`,
    method: 'DELETE',
    params: {
      userSentFriendRequestId,
    },
  });
};

const changeProfilePicture = (data) => {
  return call_api({
    url: `${USER_API_ROUTE_V1}/profile/profile-picture`,
    method: 'PUT',
    data: data,
  });
};

const getPersonalData = () => {
  return call_api({
    url: `${USER_API_ROUTE_V2}/profile`,
    method: 'GET',
  });
};

const getPosts = (userId, lastPostId) => {
  return call_api({
    url: `${USER_API_ROUTE_V2}/posts`,
    method: 'GET',
    params: {
      userId,
      lastPostId
    }
  });
};

const UserService = {
  getToken,
  login,
  signup,
  logout,
  getUser,
  getProfile,
  searchUser,
  countSearch,
  getFollowerList,
  getFollowingList,
  updateProfile,
  unFollow,
  follow,
  getUserSentFriendRequest,
  getFriendRequestSentList,
  confirmFriendRequest,
  rejectFriendRequest,
  getFriendList,
  changeProfilePicture,
  unFriend,
  searchUserByName,
  searchUserByUsername,
  getPersonalData,
  getPosts
};

export default UserService;
