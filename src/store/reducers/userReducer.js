import { appConfig } from '../../infrastructure/appManager';
import { notificationActionType } from '../action/notificationAction';
import { postActionType } from '../action/postAction';
import { userActionType } from '../action/userAction';

const initState = {
  loadingUser: true,
  updaingUser: false,
  deleting: false,
  hasError: false,
  data: {
    _id: '',
    username: '',
    name: '',
    email: '',
    profilePicture: `${appConfig.REACT_APP_SOCKET_END_POINT}/images/avatar/default.png`,
    bio: '',
    totalFollowers: 0,
    totalFollowings: 0,
    totalFriendRequestReceived: 0,
    postsCount: 0,
    allNotifications: 0,
    notificationsCount: 0,
    messagesCount: 0,
    followingIds: [],
    posts: [],
    follwingUsers: [],
    followerUsers: [],
    notifications: [],
    postLikes: [],
    commentLikes: [],
    commentReplyLikes: [],
  },
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userActionType.SET_USER:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case userActionType.UPDATE_USER:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case userActionType.NEW_FRIEND_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          totalFriendRequestReceived: state.data.totalFriendRequestReceived + 1,
        },
      };
    case userActionType.REMOVE_FRIEND_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          totalFriendRequestReceived: state.data.totalFriendRequestReceived + 1,
        },
      };
    case userActionType.GET_USER_REQUEST:
      return {
        ...state,
        loadingUser: true,
      };
    case userActionType.USER_UPDATE_PROFILEPICTURE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          profilePicture: action.user.profilePicture,
        },
        loadingUser: false,
      };
    case notificationActionType.ADD_NOTIFICATION:
      return {
        ...state,
        data: {
          ...state.data,
          notificationsCount: state.data.notificationsCount + 1,
        },
      };
    case notificationActionType.READ_NOTIFICATIOS:
      return {
        ...state,
        data: {
          ...state.data,
          notificationsCount: state.data.notificationsCount - action.readCount,
        },
      };
    case userActionType.USER_LIKE_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          commentLikes: [...state.data.commentLikes, action.comment.commentId],
        },
      };
    case userActionType.USER_DISLIKE_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          commentLikes: state.data.commentLikes.filter(
            (e) => e !== action.comment.commentId,
          ),
        },
      };
    case postActionType.LIKE_POST:
      return {
        ...state,
        data: {
          ...state.data,
          postLikes: [...state.data.postLikes, action.post.postId],
          posts: state.data.posts.map((post) => {
            if (post._id === action.post.postId) {
              return {
                ...post,
                likes: post.likes + 1,
              };
            }
            return {
              ...post,
            };
          }),
        },
      };

    case postActionType.DISLIKE_POST:
      return {
        ...state,
        data: {
          ...state.data,
          postLikes: state.data.postLikes.filter(
            (e) => e !== action.post.postId,
          ),
          posts: state.data.posts.map((post) => {
            if (post._id === action.post.postId) {
              return {
                ...post,
                likes: post.likes - 1,
              };
            }
            return {
              ...post,
            };
          }),
        },
      };

    default:
      return state;
  }
};

export default userReducer;
