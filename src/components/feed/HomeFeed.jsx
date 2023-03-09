import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Header, Icon } from 'semantic-ui-react';
import postActions from '../../store/action/postAction';
import Post from '../post/Post';

class Feed extends Component {
  componentDidMount() {
    const { dispatch, posts } = this.props;
    if (!posts.length) {
      dispatch(postActions.fetchPosts({ initialFetch: true }));
    }
  }

  fetchData = () => {
    const { dispatch, posts } = this.props;
    dispatch(
      postActions.fetchPosts({
        initialFetch: false,
        lastId: posts[posts.length - 1]._id,
      }),
    );
  };

  render() {
    const { posts, totalPosts } = this.props;
    const hasMore = posts.length === totalPosts ? false : true;
    const feedPosts = posts.map((post) => (
      <Post key={post._id} post={{ ...post, feed: true }} />
    ));

    if (!posts || posts.length === 0) {
      return (
        <div className="none-post">
          <Divider horizontal>
            <Header as="h4">
              Không có bài viết để hiển thị, muốn xem bài viết?{' '}
              <Link to="/search-user">Tìm kiếm</Link> và theo dõi bạn bè ngay
              thôi!
            </Header>
          </Divider>
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <Divider horizontal>
            <Header as="h4">
              <Icon name="eye" />
              Bạn đã xem tất cả các bài viết
            </Header>
          </Divider>
        }
      >
        {feedPosts}
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  totalPosts: state.post.totalPosts,
  loadingUser: state.user.loadingUser,
});

export default connect(mapStateToProps)(Feed);
