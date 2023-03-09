import { commentService } from '../../services/CommentService';
import { userActionType } from './userAction';

export const commentActionType = {
  POSTS_REQUEST: 'POSTS_REQUEST',
  POSTS_SUCCESS: 'POSTS_SUCCESS',
  POSTS_FAILURE: 'POSTS_FAILURE',

  FETCH_COMMENTS_REQUEST: 'FETCH_COMMENTS_REQUEST',
  FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',
  FETCH_COMMENTS_FAILURE: 'FETCH_COMMENTS_FAILURE',

  POST_DELETE_REQUEST: 'POSTS_DELETE_REQUEST',
  POST_DELETE_SUCCESS: 'POSTS_DELETE_SUCCESS',
  POST_DELETE_FAILURE: 'POSTS_DELETE_FAILURE',

  INIT_REPLY_COMMENT: 'INIT_REPLY_COMMENT',
  ADD_REPLY_COMMENT_SUCCESS: 'ADD_REPLY_COMMENT_SUCCESS',
  ADD_REPLY_COMMENT_FAILURE: 'ADD_REPLY_COMMENT_FAILURE',

  FETCH_COMMENT_REPLIES_REQUEST: 'FETCH_COMMENT_REPLIES_REQUEST',
  FETCH_COMMENT_REPLIES_SUCCESS: 'FETCH_COMMENT_REPLIES_SUCCESS',
  FETCH_COMMENT_REPLIES_FAILURE: 'FETCH_COMMENT_REPLIES_FAILURE',

  INCREASE_REPLIES_NUMBER: 'INCREASE_REPLIES_NUMBER',

  ADD_COMMENT_REQUEST: 'ADD_COMMENT_REQUEST',
  ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_FAILURE: 'ADD_COMMENT_FAILURE',

  DISLIKE_COMMENT: 'DISLIKE_COMMENT',
  LIKE_COMMENT: 'LIKE_COMMENT',

  LIKE_COMMENT_REPLY: 'LIKE_COMMENT_REPLY',
  DISLIKE_COMMENT_REPLY: 'DISLIKE_COMMENT_REPLY',

  NEW_POST: 'NEW_POST',
  GET_COMMENT_LIKES: 'GET_COMMENT_LIKES',
  GET_COMMENT_REPLY_LIKES: 'GET_COMMENT_REPLY_LIKES',
};

export const commentActions = {
  addComment,
  getPostComments,
  getCommentLikes,
  getCommentReplyLikes,
  addCommentReply,
  getPostCommentReplies,
  likeComment,
  likeCommentReply,
};

function addComment(params) {
  return (dispatch) => {
    commentService.addComment(params).then(
      (res) => {
        dispatch({
          type: commentActionType.INIT_REPLY_COMMENT,
          commentId: res.comment._id,
        });
        dispatch(success(res.comment));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function success(comment) {
    return { type: commentActionType.ADD_COMMENT_SUCCESS, comment };
  }
}

function addCommentReply(params) {
  return (dispatch) => {
    const { commentId, postId } = params;
    commentService.addCommentReply(params).then(
      (res) => {
        dispatch({
          type: commentActionType.INCREASE_REPLIES_NUMBER,
          commentId,
          postId,
        });

        dispatch(success(res.comment));
      },
      (error) => {
        console.log(error);
      },
    );
  };

  function success(comment) {
    return { type: commentActionType.ADD_REPLY_COMMENT_SUCCESS, comment };
  }
}

function getPostComments(postId, queryOptions) {
  return (dispatch) => {
    dispatch(request(postId));

    commentService.getPostComments(postId, queryOptions).then(
      (comment) => {
        comment.comments.forEach((comment) => {
          dispatch({
            type: commentActionType.INIT_REPLY_COMMENT,
            commentId: comment._id,
          });
        });
        dispatch(success(comment, queryOptions));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function request(postId) {
    return { type: commentActionType.FETCH_COMMENTS_REQUEST, postId };
  }
  function success(comment, queryOptions) {
    return {
      type: commentActionType.FETCH_COMMENTS_SUCCESS,
      comment,
      queryOptions,
    };
  }
}

function getPostCommentReplies(commentId, queryOptions) {
  return (dispatch) => {
    dispatch(request(commentId));

    commentService.getCommentReplies(commentId, queryOptions).then(
      (comment) => {
        dispatch(success(comment));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function request(commentId) {
    return { type: commentActionType.FETCH_COMMENT_REPLIES_REQUEST, commentId };
  }
  function success(comment) {
    return { type: commentActionType.FETCH_COMMENT_REPLIES_SUCCESS, comment };
  }
}

function likeComment(params) {
  return (dispatch) => {
    const { commentId, postId, commentLikes } = params;
    if (commentLikes.some((e) => e === commentId)) {
      dispatch(
        success(commentActionType.DISLIKE_COMMENT, { commentId, postId }),
      );
      dispatch(
        success(userActionType.USER_DISLIKE_COMMENT, { commentId, postId }),
      );
    } else {
      dispatch(success(commentActionType.LIKE_COMMENT, { commentId, postId }));
      dispatch(
        success(userActionType.USER_LIKE_COMMENT, { commentId, postId }),
      );
    }
    commentService.likeComment(params).then(
      () => {},
      (error) => {
        console.log(error);
      },
    );
  };
  function success(type, comment) {
    return { type, comment };
  }
}

function likeCommentReply(params) {
  return (dispatch) => {
    const { commentId, commentAt, commentReplyLikes } = params;
    if (commentReplyLikes.some((e) => e === commentId)) {
      dispatch(
        success(commentActionType.DISLIKE_COMMENT_REPLY, {
          commentId,
          parentId: commentAt,
        }),
      );
      dispatch(
        success(userActionType.USER_DISLIKE_COMMENT_REPLY, {
          commentId,
          parentId: commentAt,
        }),
      );
    } else {
      dispatch(
        success(commentActionType.LIKE_COMMENT_REPLY, {
          commentId,
          parentId: commentAt,
        }),
      );
      dispatch(
        success(userActionType.USER_LIKE_COMMENT_REPLY, {
          commentId,
          parentId: commentAt,
        }),
      );
    }

    commentService.likeCommentReply(params).then(
      () => {},
      (error) => {
        console.log(error);
      },
    );
  };
  function success(type, comment) {
    return { type, comment };
  }
}

function getCommentLikes(commentId) {
  return (dispatch) => {
    commentService.getCommentLikes(commentId).then(
      (res) => {
        dispatch(success(res.users[0].users_likes));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function success(commentLikes) {
    return { type: commentActionType.GET_COMMENT_LIKES, commentLikes };
  }
}

function getCommentReplyLikes(commentId) {
  return (dispatch) => {
    commentService.getCommentReplyLikes(commentId).then(
      (res) => {
        dispatch(success(res.users[0].users_likes));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function success(commentLikes) {
    return { type: commentActionType.GET_COMMENT_REPLY_LIKES, commentLikes };
  }
}
