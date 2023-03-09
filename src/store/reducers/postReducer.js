import { commentActionType } from "../action/commentAction";
import { postActionType } from "../action/postAction";

const initialState = {
  posts: [],
  postsByHashtag: [],
  postsByLocation: [],
  totalPosts: 0,
  totalPostsByHashtag: 0,
  totalPostsByLocation: 0,
  coordinates: null,
  hashtag: null,
  postLikes: [],
  post: {
    fetching: true
  },
  fetching: false,
  deleting: false,
  posting: false
};

export default function post(state = initialState, action) {
  switch (action.type) {
    case postActionType.POSTS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case postActionType.LOCATION_POSTS_REQUEST:
      if (action.initialFetch) {
        return {
          ...state,
          postsByLocation: [],
          totalPostsByLocation: 0,
          coordinates: null
        };
      }
      return {
        ...state
      };
    case postActionType.HASHTAG_POSTS_REQUEST:
      if (action.initialFetch) {
        return {
          ...state,
          postsByHashtag: [],
          totalPostsByHashtag: 0,
          hashtag: null
        };
      }
      return {
        ...state
      };
    case postActionType.POSTS_SUCCESS:
      if (action.initialFetch) {
        return {
          ...state,
          posts: action.posts,
          totalPosts: action.total.count,
          fetching: false
        };
      }
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
        fetching: false
      };
    case postActionType.HASHTAG_POSTS_SUCCESS:
      if (action.initialFetch) {
        return {
          ...state,
          postsByHashtag: action.posts,
          hashtag: action.hashtag,
          totalPostsByHashtag: action.total.count,
          fetching: false
        };
      }
      return {
        ...state,
        postsByHashtag: [...state.postsByHashtag, ...action.posts],
        fetching: false
      };
    case postActionType.LOCATION_POSTS_SUCCESS:
      if (action.initialFetch) {
        return {
          ...state,
          postsByLocation: action.posts,
          coordinates: action.coordinates,
          totalPostsByLocation: action.total.count,
          fetching: false
        };
      }
      return {
        ...state,
        postsByLocation: [...state.postsByLocation, ...action.posts],
        fetching: false
      };
    case postActionType.GET_POST_LIKES:
      return {
        ...state,
        postLikes: [...state.postLikes, ...action.postLikes]
      };
    case "CLEAR_POSTS":
      return {
        ...state,
        ...initialState
      };
    case "CLEAR_POST_LIKES":
      return {
        ...state,
        postLikes: []
      };

    case postActionType.POST_DELETE_REQUEST:
      return {
        ...state,
        deleting: true
      };
    case postActionType.POST_DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        post: {
          fetching: true
        }
      };
    case commentActionType.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.comment.post) {
            return { ...post, comments: post.comments + 1 };
          } else {
            return post;
          }
        }),
        post: {
          ...state.post,
          comments: state.post.comments + 1
        }
      };

    case postActionType.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.post.postId) {
            return { ...post, likes: post.likes + 1 };
          } else {
            return post;
          }
        }),
        post: {
          ...state.post,
          likes: state.post.likes + 1
        }
      };
    case postActionType.DISLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.post.postId) {
            return { ...post, likes: post.likes - 1 };
          } else {
            return post;
          }
        }),
        post: {
          ...state.post,
          likes: state.post.likes - 1
        }
      };
    case postActionType.GET_POST:
      return {
        ...state,
        post: { ...action.post[0], fetching: false }
      };
    default:
      return state;
  }
}
