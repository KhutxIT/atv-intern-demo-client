import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Divider } from 'semantic-ui-react';
import PostComment from './PostComment';
import { commentActions } from '../../store/action/commentAction';

class PostComments extends Component {
  state = {
    commentText: '',
  };
  componentDidMount = () => {
    const { dispatch, post, comments } = this.props;
    if (!comments[post.postId]) {
      dispatch(commentActions.getPostComments(post.postId));
    }
  };
  handleChange = e => {
    this.setState({
      commentText: e.target.value
    });
  };

  handlePostCommentSubmit = () => {
    const { dispatch, post } = this.props;
    const { commentText } = this.state;
    dispatch(
      commentActions.addComment(
        commentText,
        post.postId,
        post.authorId,
        post.photo
      )
    );
    this.setState({ commentText: "" });
  };

  handleScroll = (e, hasMore) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore) {
      this.fetchData();
    }
  };
  fetchData = () => {
    const { dispatch, post, comments } = this.props;
    if (!comments[post.postId].fetching) {
      const lastId =
        comments[post.postId].comments[
          comments[post.postId].comments.length - 1
        ]._id;
      dispatch(
        commentActions.getPostComments(post.postId, {
          initialFetch: false,
          lastId,
        }),
      );
    }
  };

  render() {
    const { post, comments } = this.props;
    if (comments[post.postId]) {
      const fetchedComments = comments[post.postId].comments;
      const hasMore =
        fetchedComments?.length === post.commentsCount ? false : true;
      const postComments = fetchedComments?.map((comment) => (
        <PostComment key={comment._id} comment={comment} post={post} />
      ));
      const fetching = comments[post.postId].fetching;
      return (
        <div className="post-comments">
          <Comment.Group
            size="large"
            onScroll={(e) => this.handleScroll(e, hasMore)}
            style={{ overflow: 'auto', maxHeight: '600px' }}
          >
            {fetching ? <p>Đang tải...</p> : null}
            {postComments?.length ? postComments : null}

            {fetchedComments?.length && hasMore ? (
              <Fragment>
                <Divider></Divider>
                <Button loading={fetching} onClick={this.fetchData}>
                  Tải thêm {post.commentsCount - fetchedComments.length} bình luận
                </Button>
              </Fragment>
            ) : null}
          </Comment.Group>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
});

export default connect(mapStateToProps)(PostComments);
