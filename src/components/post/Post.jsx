import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Icon,
  Image,
  Modal,
  Segment
} from 'semantic-ui-react';
import { appConfig } from '../../infrastructure/appManager';
import { commentActions } from '../../store/action/commentAction';
import postActions from '../../store/action/postAction';
import CommentForm from '../comment/CommentForm';
import PostComments from '../comment/PostComments';
import LikePost from './LikePost';

import 'moment/locale/vi';
import moment from 'moment/moment';
import { convertDateToFromNow } from '../../utils';

moment().locale('vi');

class Post extends Component {
  state = {
    open: false,
    loadedImg: false,
    value: '',
    showTags: false,
    optionsLoggedIn: [
      { key: 'copy', icon: 'copy', text: 'Sao chép đường dẫn', value: 'copy' },
      {
        key: 'goto',
        icon: 'paper plane outline',
        text: 'Đi đến bài viết',
        value: 'goto',
      },
      { key: 'delete', icon: 'delete', text: 'Xóa bài viết', value: 'delete' },
    ],
    optionsNotLoggedIn: [
      { key: 'copy', icon: 'copy', text: 'Sao chép đường dẫn', value: 'copy' },
      {
        key: 'goto',
        icon: 'paper plane outline',
        text: 'Đi đến bài viết',
        value: 'goto',
      },
    ],
    openComments: false,
  };

  close = () => this.setState({ open: false, value: '' });

  handleToggleTags = () => {
    this.setState({ showTags: !this.state.showTags });
  };

  getPostComments = () => {
    this.setState({ openComments: !this.state.openComments });
    const { dispatch, post, comments } = this.props;

    if (
      // !comments[post._id].comments.length &&
      // !comments[post._id].fetching &&
      post.comments
    ) {
      dispatch(
        commentActions.getPostComments(post._id, { initialFetch: true }),
      );
    }
  };

  deletePost = () => {
    const { dispatch, post } = this.props;
    dispatch(postActions.deletePost(post._id));
  };

  handleChange = (e, { name, value }) => {
    const { history } = this.props;
    this.setState({ value, open: false });
    if (value === 'goto') {
      history.push('/post/' + this.props.post._id);
      this.setState({ value, open: false });
    }
    if (value === 'delete') {
      this.setState({ value, open: true });
    }
    if (value === 'copy') {
      navigator.clipboard.writeText(
        appConfig.CLIENT_HOST + '/post/' + this.props.post._id,
      );
    }
  };

  handleClose = () => {
    this.setState({ value: '', open: false });
  };

  render() {
    const { post, _id, username, history } = this.props;
    const { open, optionsLoggedIn, optionsNotLoggedIn, value, showTags } =
      this.state;

    const isFeedMarginBottom = post.feed ? '5rem' : '0';
    const renderDivs = post.tags?.map((div) => (
      <div
        key={div.id}
        className="text-box"
        style={{
          top: div.y + '%',
          left: div.x + '%',
          display: showTags ? 'block' : 'none',
        }}
      >
        <div className="tooltip tooltip-top">
          {div.value === username ? (
            <Link to={'/profile'}>{div.value}</Link>
          ) : (
            <Link to={'/' + div.value}>{div.value}</Link>
          )}
        </div>
      </div>
    ));
    const ribbon = post.tags?.length ? (
      <div className="ribbon">
        <Icon
          circular
          size="large"
          name="users"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            display: showTags ? 'none' : 'block',
          }}
        />
      </div>
    ) : null;
    return (
      <div className="post" style={{ marginBottom: '40px' }}>
        <div className="post-header">
          <div className="post-label">
            <div className="label-image">
              <img src={`${post.author[0].profilePicture}`} alt="" />
            </div>
            <div className="label-info">
              <div className="label-username">
                <Link
                  to={
                    post.author[0].username === username
                      ? '/personal'
                      : '/profile/' + post.author[0]._id
                  }
                >
                  {post.author[0].username}
                </Link>
              </div>
              <div className="label-time">
                {convertDateToFromNow(post.createdAt)}
              </div>
            </div>
            {post.location && post.location.address !== '' ? (
              <div className="label-location">
                <Link
                  to={`/location/${post.location.coordinates[0]},${post.location.coordinates[1]}`}
                >
                  {post.location.address}
                </Link>
              </div>
            ) : null}
          </div>
          <div className="post-options">
            <Modal closeIcon open={open} onClose={this.close} size="tiny">
              <Modal.Header>Xóa bài viết</Modal.Header>
              <Modal.Content>
                <p>Xác nhận xóa bài viết</p>
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={this.close}>
                  Hủy
                </Button>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="Yes"
                  onClick={this.deletePost}
                />
              </Modal.Actions>
            </Modal>
            {post.author[0]._id === _id ? (
              <Button.Group>
                <Dropdown
                  selectOnNavigation={false}
                  onChange={this.handleChange}
                  value={value}
                  className="button icon"
                  floating
                  options={optionsLoggedIn}
                  trigger={<React.Fragment />}
                />
              </Button.Group>
            ) : (
              <Button.Group>
                <Dropdown
                  selectOnNavigation={false}
                  onChange={this.handleChange}
                  value={value}
                  className="button icon"
                  floating
                  options={optionsNotLoggedIn}
                  trigger={<React.Fragment />}
                />
              </Button.Group>
            )}
          </div>
          <div className="mt-3">{post.description}</div>
        </div>

        <div className="post-image">
          {this.state.loadedImg ? null : (
            <Segment loading>
              <Image src={`${post.photo}`} />
            </Segment>
          )}
          <img
            onClick={this.handleToggleTags}
            onLoad={() => this.setState({ loadedImg: true })}
            style={this.state.loadedImg ? {} : { display: 'none' }}
            src={`${post.photo}`}
            alt=""
          />
          {ribbon}
          {renderDivs}
        </div>

        <div className="post-footer">
          <div className="footer-likes">
            <LikePost
              post={{
                postId: post._id,
                photo: post.photo,
                authorId: post.author[0]._id,
                likes: post.likes,
              }}
            />
          </div>
          <div className="footer-comments">
            <Icon
              name="comment outline"
              style={{ cursor: 'pointer' }}
              onClick={this.getPostComments}
            />
            <div>{post.comments}</div>
          </div>
        </div>
        {this.state.openComments ? (
          <PostComments
            post={{
              postId: post._id,
              commentsCount: post.comments,
              photo: post.photo,
              authorId: post.author[0]._id,
            }}
          />
        ) : null}

        <div className="post-form">
          <CommentForm
            post={{
              postId: post._id,
              authorId: post.author[0]._id,
              photo: post.photo,
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { _id, username } = state.user.data;
  return {
    _id,
    username,
    comments: state.comments,
  };
};

export default withRouter(connect(mapStateToProps)(Post));
