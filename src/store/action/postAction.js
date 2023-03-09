import PostService, { postService } from '../../services/PostService';
import Notification from '../../utils/notification';
import UserService from '../../services/UserService';
import { userActionType } from './userAction';

export const postActionType = {
  CANVAS_HAS_VALUE: 'CANVAS_HAS_VALUE',
  IMAGE_CROP_SELECT: 'IMAGE_CROP_SELECT',
  PREVIOUS_PAGE: 'PREVIOUS_PAGE',
  NEXT_PAGE: 'NEXT_PAGE',
  IMAGE_SELECT: 'IMAGE_SELECT',
  RESET_IMAGE: 'RESET_IMAGE',
  INIT_COMMENT: 'INIT_COMMENT',
  ADD_POST_REQUEST: 'ADD_POST_REQUEST',
  ADD_POST_SUCCESS: 'ADD_POST_SUCCESS',
  ADD_POST_FAILURE: 'ADD_POST_FAILURE',
  POSTS_REQUEST: 'POSTS_REQUEST',
  POSTS_SUCCESS: 'POSTS_SUCCESS',
  POSTS_FAILURE: 'POSTS_FAILURE',

  HASHTAG_POSTS_SUCCESS: 'HASHTAG_POSTS_SUCCESS',
  LOCATION_POSTS_SUCCESS: 'LOCATION_POSTS_SUCCESS',

  HASHTAG_POSTS_REQUEST: 'HASHTAG_POSTS_REQUEST',
  LOCATION_POSTS_REQUEST: 'LOCATION_POSTS_REQUEST',

  POST_DELETE_REQUEST: 'POSTS_DELETE_REQUEST',
  POST_DELETE_SUCCESS: 'POSTS_DELETE_SUCCESS',
  POST_DELETE_FAILURE: 'POSTS_DELETE_FAILURE',

  LIKE_POST: 'LIKE_POST',
  DISLIKE_POST: 'DISLIKE_POST',

  GET_POST_LIKES: 'GET_POST_LIKES',

  NEW_POST: 'NEW_POST',
  GET_POST: 'GET_POST',

  MAP_LOCATION_SELECT: 'MAP_LOCATION_SELECT',
};

const addProfiePicture = (post) => (dispatch) => {
  Notification.loading('Đang cập nhật ảnh đại diện');
  const request = () => {
    return { type: userActionType.GET_USER_REQUEST };
  };
  const success = (user) => {
    return { type: userActionType.USER_UPDATE_PROFILEPICTURE_SUCCESS, user };
  };

  dispatch(request());

  UserService.changeProfilePicture(post)
    .then((res) => {
      dispatch(success(res.data?.data));
      Notification.updateCurrentLoadingToSuccess(
        'Cập nhật ảnh đại diện thành công',
      );
    })
    .catch(({ response }) => console.log(response.data));
};

const selectImage = (imgSrc, imgSrcExt) => (dispatch) => {
  dispatch({ type: postActionType.IMAGE_SELECT, imgSrc, imgSrcExt });
};

const canvasHasValue = (hasValue) => (dispatch) => {
  dispatch({ type: postActionType.CANVAS_HAS_VALUE, hasValue });
};

const getCroppedSrc = (imgSrc) => (dispatch) => {
  dispatch({ type: postActionType.IMAGE_CROP_SELECT, imgSrc });
};

const addPost = (postData) => (dispatch) => {
  Notification.loading('Đang đăng bài viết');

  PostService.createPost(postData)
    .then((res) => {
      Notification.updateCurrentLoadingToSuccess('Đăng bài viết thành công');
      dispatch({
        type: postActionType.INIT_COMMENT,
        postId: res.data?.data?._id,
      });
      dispatch({ type: postActionType.ADD_POST_SUCCESS });
    })
    .catch(({ response }) => {
      Notification.updateCurrentLoadingToError('Có lỗi xảy ra ');
    });
};

export function getFeedPosts(initialFetch, lastPostId) {
  return (dispatch) => {
    //dispatch(request());

    PostService.getFeedPosts(initialFetch, lastPostId).then((response) => {
      if (initialFetch) {
        const { posts, total } = response.data?.data[0];
        posts.forEach((post) =>
          dispatch({ type: postActionType.INIT_COMMENT, postId: post._id }),
        );
        dispatch(success(posts, total[0], initialFetch));
      } else {
        dispatch(success(response));
        response.forEach((post) =>
          dispatch({ type: postActionType.INIT_COMMENT, postId: post._id }),
        );
      }
    });
  };

  function success(posts, total, initialFetch) {
    return { type: postActionType.POSTS_SUCCESS, posts, total, initialFetch };
  }
}

function changeTextareaValue(value) {
  return (dispatch) => {
    dispatch({ type: postActionType.TEXTAREA_VALUE_CAHNGE, value });
  };
}

function mapLoactionSelect(location) {
  return (dispatch) => {
    dispatch({ type: postActionType.MAP_LOCATION_SELECT, location });
  };
}

function fetchPosts(queryParams) {
  return (dispatch) => {
    //dispatch(request());

    postService.fetchPosts(queryParams).then(
      (response) => {
        if (queryParams.initialFetch) {
          const { posts, total } = response[0];
          posts.forEach((post) =>
            dispatch({ type: postActionType.INIT_COMMENT, postId: post._id }),
          );
          dispatch(success(posts, total[0], queryParams.initialFetch));
        } else {
          dispatch(success(response));
          response.forEach((post) =>
            dispatch({ type: postActionType.INIT_COMMENT, postId: post._id }),
          );
        }
      },
      (error) => {},
    );
  };

  function success(posts, total, initialFetch) {
    return { type: postActionType.POSTS_SUCCESS, posts, total, initialFetch };
  }
}

function deletePost(postId) {
  return (dispatch) => {
    Notification.loading('Đang xóa bài viết');

    postService.deletePost(postId).then(
      (res) => {
        dispatch(success(res));
        Notification.updateCurrentLoadingToSuccess('Đã xóa bài viết');
        window.location.replace('/personal');
      },
      (error) => {
        console.log(error);
      },
    );
  };

  function success(result) {
    return { type: postActionType.POST_DELETE_SUCCESS, result };
  }
}

function likePost(postId, auhtorId, postLikes) {
  return (dispatch) => {
    if (postLikes.some((e) => e === postId)) {
      dispatch(success(postActionType.DISLIKE_POST, { postId }));
    } else {
      dispatch(success(postActionType.LIKE_POST, { postId }));
    }
    postService.likePost(postId, auhtorId).then(
      () => {},
      (error) => {
        console.log(error);
      },
    );
  };

  function success(type, post) {
    return { type, post };
  }
}

function getPostLikes(postId) {
  return (dispatch) => {
    postService.getPostLikes(postId).then(
      (res) => {
        dispatch(success(res.users[0].users_likes));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function success(postLikes) {
    return { type: postActionType.GET_POST_LIKES, postLikes };
  }
}

function getPost(postId) {
  return (dispatch) => {
    postService.getPost(postId).then(
      (response) => {
        document.title = 'Bài viết của' + response.post[0].author[0].name;
        dispatch(success(postActionType.GET_POST, response.post));
        dispatch({
          type: postActionType.INIT_COMMENT,
          postId: response.post[0]._id,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function success(type, post) {
    return { type, post };
  }
}

const postActions = {
  addProfiePicture,
  canvasHasValue,
  getCroppedSrc,
  addPost,
  selectImage,
  mapLoactionSelect,
  changeTextareaValue,
  fetchPosts,
  deletePost,
  likePost,
  getPostLikes,
  getPost,
};

export default postActions;
