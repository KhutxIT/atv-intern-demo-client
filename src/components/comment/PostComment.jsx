import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';
import { commentActions } from '../../store/action/commentAction';
// import CommentReplies from '../CommentReplies/CommentReplies';
import 'react-autocomplete-input/dist/bundle.css';
import { debounce } from 'throttle-debounce';
import LikeComment from './LikeComment';

import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';
import Linkify from 'linkifyjs/react';
import { convertDateToFromNow } from '../../utils';

hashtag(linkify);
mention(linkify);

function searchUser(q) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q }),
  };

  return fetch('/api/user/searchByUsername', requestOptions).then((res) => {
    return res;
  });
}

const linkifyOptions = {
  formatHref: function (href, type) {
    if (type === 'hashtag') {
      href = '/hashtags/' + href.substring(1);
    }
    if (type === 'mention') {
      href = '/' + href.substring(1);
    }
    return href;
  },
  attributes: {
    target: {
      url: '_blank',
    },
  },
};

class PostComment extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      replyText: '',
      part: '',
      suggestions: [],
    };

    this.debouncedRequestOptions = debounce(500, this.handleRequestOptions);
  }

  handleChange = (value) => {
    this.setState({ replyText: value });
  };

  handleRequestOptions = (part) => {
    this.setState({ part });

    if (part !== '') {
      searchUser(part).then((response) => {
        if (part === this.state.part) {
          response.json().then((results) => {
            this.setState({
              isLoading: false,
              suggestions: results.users.map((user) => user.username),
            });
          });
        } else {
          // Ignore suggestions if input value changed
          this.setState({
            isLoading: false,
          });
        }
      });
    }
  };

  handleFormToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleSubmit = () => {
    const { dispatch, post, comment } = this.props;

    const { replyText } = this.state;
    if (replyText !== '') {
      dispatch(
        commentActions.addCommentReply({
          text: replyText,
          commentId: comment._id,
          postId: post.postId,
          authorId: comment.author[0]._id,
        }),
      );
      this.setState({ replyText: '', isOpen: false });
    }
  };

  render() {
    const { post, comment, username } = this.props;

    return (
      <Comment>
        <Comment.Avatar src={`${comment.author[0].profilePicture}`} />
        <Comment.Content>
          <Comment.Author
            as={Link}
            to={
              comment.author[0].username === username
                ? '/personal'
                : '/profile/' + comment.author[0]._id
            }
          >
            {comment.author[0].username}
          </Comment.Author>
          <Comment.Metadata>
            <div>{convertDateToFromNow(comment.createdAt)}</div>
          </Comment.Metadata>
          <Comment.Text style={{ whiteSpace: 'pre-line' }}>
            <Linkify options={linkifyOptions}>{comment.text}</Linkify>
          </Comment.Text>
          <Comment.Actions>
            <LikeComment
              comment={{
                commentId: comment._id,
                commentText: comment.text,
                likes: comment.likes,
                authorId: comment.author[0]._id,
              }}
              post={{
                postId: post.postId,
                photo: post.photo,
              }}
            />
          </Comment.Actions>
        </Comment.Content>
        {/* <CommentReplies
          comment={{
            commentId: comment._id,
            //number fo replies
            repliesNum: comment.replies,
          }}
          post={{
            postId: post.postId,
            photo: post.photo,
          }}
        /> */}
      </Comment>
    );
  }
}

const mapStateToProps = (state) => ({
  // logged in user username
  username: state.user.data.username,
});

export default connect(mapStateToProps)(PostComment);
