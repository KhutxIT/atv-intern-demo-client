import { appConfig } from '../infrastructure/appManager';
import call_api from './Request';
import UserService from './UserService';

const MEDIA_API_ROUTE_V1 = '/v1/medias';

const POST_API_ROUTE_V2 = '/v2/posts';

const createPost = (post) => {
  return call_api({
    url: `${POST_API_ROUTE_V2}`,
    method: 'POST',
    data: post,
  });
};

const getFeedPosts = (initialFetch, lastPostId) => {
  return call_api({
    url: `${POST_API_ROUTE_V2}`,
    method: 'GET',
    params: {
      initialFetch,
      lastPostId,
    },
  });
};

export const postService = {
  fetchPosts,
  getPostsByHashtag,
  getPostsByLocation,
  deletePost,
  likePost,
  getPostLikes,
  getPost,
  logout,
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function fetchPosts(queryParams) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ ...queryParams }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/getPosts/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((response) => {
      return response.data;
    });
}

function getPostLikes(postId) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ postId }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/getPostLikes/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getPostsByHashtag(hashtag, queryParams) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ hashtag, ...queryParams }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/getPostsByHashtag/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((response) => {
      return response.data;
    });
}

function getPostsByLocation(coordinates, queryParams) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ coordinates, ...queryParams }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/getPostsByLocation/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((response) => {
      return response.data;
    });
}

function deletePost(postId) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ postId }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/delete/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((res) => {
      return res;
    });
}

function likePost(postId, authorId) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ postId, authorId }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/likePost/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((res) => {
      return res;
    });
}

function getPost(postId) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ postId }),
  };

  return fetch(
    `${appConfig.REACT_APP_SOCKET_END_POINT}/api/v1/posts/getPost/`,
    requestOptions,
  )
    .then(handleResponse)
    .then((res) => {
      return res;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        console.log(response);
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

const getAllUserPosts = (userId) => {
  return call_api({
    url: `${POST_API_ROUTE_V2}/${userId}`,
    method: 'GET',
  });
};

const PostService = {
  createPost,
  getFeedPosts,
  getAllUserPosts,
};

export default PostService;
