import React, { Component } from 'react';
import { connect } from 'react-redux';
import postActions from '../../../store/action/postAction';
import Post from '../../../components/post/Post';
import { DEFAULT_TITLE } from '../../../constant';

class PostPage extends Component {
  componentDidMount() {
    const { match, dispatch, user } = this.props;
    document.title = user.data.name ? user.data.name : DEFAULT_TITLE;
    dispatch(postActions.getPost(match.params._id));
  }

  componentDidUpdate() {
    const { match, dispatch, user, post } = this.props;
    document.title =
      'Bài viết của' + post && post.author && post?.author[0]?.name
        ? post?.author[0]?.name
        : DEFAULT_TITLE;
  }

  render() {
    const { post } = this.props;
    return (
      <div className="container my-3" style={{ width: '700px' }}>
        {!post.fetching && <Post post={post} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post.post,
  loadingUser: state.user.loadingUser,
  alert: state.alert,
  user: state.user,
});

const connectedHomePage = connect(mapStateToProps)(PostPage);
export { connectedHomePage as default };
