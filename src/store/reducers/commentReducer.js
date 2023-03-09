import { commentActionType } from '../action/commentAction';
import { postActionType } from '../action/postAction';

const initialState = { commentLikes: [] };

const comments = (state = initialState, action) => {
  switch (action.type) {
    case commentActionType.FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          fetching: true,
        },
      };

    case commentActionType.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        [action.comment.postId]: {
          ...state[action.comment.postId],
          fetching: false,
          comments: [
            // ...state[action.comment.postId].comments,
            ...action.comment.comments,
          ],
        },
      };

    case postActionType.INIT_COMMENT:
      if (!state[[action.postId]]) {
        return {
          ...state,
          [action.postId]: {
            fetching: false,
            comments: [],
          },
        };
      } else {
        return { ...state };
      }

    case commentActionType.INCREASE_REPLIES_NUMBER:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: state[action.postId].comments.map((comment) => {
            if (comment._id === action.commentId) {
              return { ...comment, replies: comment.replies + 1 };
            } else {
              return comment;
            }
          }),
        },
      };

    case commentActionType.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment.post]: {
          ...state[action.comment.post],
          fetching: false,
          comments: [action.comment, ...state[action.comment.post].comments],
        },
      };

    case commentActionType.LIKE_COMMENT:
      return {
        ...state,
        [action.comment.postId]: {
          ...state[action.comment.postId],
          comments: state[action.comment.postId].comments.map((comment) => {
            if (comment._id === action.comment.commentId) {
              return { ...comment, likes: comment.likes + 1 };
            } else {
              return comment;
            }
          }),
        },
      };

    case commentActionType.DISLIKE_COMMENT:
      return {
        ...state,
        [action.comment.postId]: {
          ...state[action.comment.postId],
          comments: state[action.comment.postId].comments.map((comment) => {
            if (comment._id === action.comment.commentId) {
              return { ...comment, likes: comment.likes - 1 };
            } else {
              return comment;
            }
          }),
        },
      };

    case commentActionType.GET_COMMENT_LIKES:
      return {
        ...state,
        commentLikes: [...state.commentLikes, ...action.commentLikes],
      };

    case 'CLEAR_COMMENT_LIKES':
      return {
        ...state,
        commentLikes: [],
      };

    default:
      return state;
  }
};

export default comments;
