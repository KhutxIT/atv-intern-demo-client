import React, { Fragment } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Icon, List, Modal } from 'semantic-ui-react';
import postActions from '../../store/action/postAction';
import FollowList from '../list/followlist/FollowList';

const LikePost = ({ post, postLikes, postLikeList }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handlePostLike = () => {
    dispatch(postActions.likePost(post.postId, post.authorId, postLikes));
  };

  const getPostLikes = () => {
    dispatch(postActions.getPostLikes(post.postId));
  };

  const handleClose = () => {
    dispatch({ type: 'CLEAR_POST_LIKES' });
  };

  return (
    <Fragment>
      {postLikes.some((e) => e === post.postId) ? (
        <>
          <Icon
            onClick={handlePostLike}
            style={{ color: '#ed4956', cursor: 'pointer' }}
            name="heart"
            className="heart-icon"
          />
        </>
      ) : (
        <Icon
          onClick={handlePostLike}
          style={{ cursor: 'pointer' }}
          name="heart outline"
          className="heart-icon"
        />
      )}

      <Modal
        closeIcon
        trigger={
          <span style={{ cursor: 'pointer' }} onClick={getPostLikes}>
            {post.likes}
          </span>
        }
        onClose={handleClose}
        size="small"
        className="like-modal"
      >
        <Modal.Header>Danh sách người thích</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <List verticalAlign="middle" size="huge">
              {postLikeList.length
                ? postLikeList.map(({ author }) => (
                    <FollowList key={author._id} user={author}></FollowList>
                  ))
                : null}
            </List>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  postLikes: state.user.data.postLikes,
  postLikeList: state.post.postLikes,
});

export default connect(mapStateToProps)(LikePost);
