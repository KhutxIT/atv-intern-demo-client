import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Dimmer,
  Divider,
  Icon,
  List,
  Loader,
  Modal,
  Message,
} from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EditPersonalProfileModal from '../../../components/editprofile/EditPersonalProfileModal';
import FollowList from '../../../components/list/followlist/FollowList';
import { DEFAULT_TITLE } from '../../../constant';
import UserService from '../../../services/UserService';
import { getMorePosts } from '../../../store/action/userAction';
import Post from '../../../components/post/Post';
// import Post2 from '../../../components/post/Post2';
import './style.scss';

function PersonalPage() {
  const user = useSelector(({ user }) => user);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);

  const dispatch = useDispatch();

  const hasMore =
    user.data.postsCount === user.data.posts.length ? false : true;

  useEffect(() => {
    document.title = user.data.name ? user.data.name : DEFAULT_TITLE;
  }, [user.data.name]);

  const handleGetFollowingList = () => {
    UserService.getFollowingList(user.data._id)
      .then((res) => setFollowingList(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  const handleGetFollowerList = () => {
    UserService.getFollowerList(user.data._id)
      .then((res) => setFollowerList(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  const handleGetFriendList = () => {
    UserService.getFriendList(user.data._id)
      .then((res) => setFriends(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  const fetchData = () => {
    const lastPostId = user.data.posts[user.data.posts.length - 1]._id;
    dispatch(getMorePosts({ userId: user.data._id, lastPostId }));
  };

  return (
    <div className="main">
      {/* {user.loadingUser ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : ( */}
      <Fragment>
        {/* {user.deleting ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          ) : null} */}

        <header>
          <div className="container">
            <div className="profile">
              <div className="profile-image">
                <img src={user.data.profilePicture} alt={user.data.name} />
              </div>

              <div className="profile-user-settings">
                <h1 className="profile-user-name mb-2">{user.data.username}</h1>

                <Button
                  as={Link}
                  to="/posts/upload"
                  className="profile-edit-btn ml-5"
                  size="medium"
                  icon
                  labelPosition="right"
                >
                  Tạo bài viết
                  <Icon name="upload" />
                </Button>
                <EditPersonalProfileModal>
                  <Button
                    className="profile-edit-btn ml-5"
                    size="medium"
                    icon
                    labelPosition="right"
                  >
                    Chỉnh sửa thông tin cá nhân
                    <Icon name="setting" />
                  </Button>
                </EditPersonalProfileModal>
              </div>
              <div className="profile-stats">
                <ul>
                  <li>
                    <span className="profile-stat-count">
                      {user.data.postsCount}
                    </span>{' '}
                    bài đăng
                  </li>
                  <Modal
                    closeIcon
                    onOpen={() => setOpenFollowersModal(true)}
                    onClose={() => setOpenFollowersModal(false)}
                    open={openFollowersModal}
                    trigger={
                      <li onClick={handleGetFollowerList}>
                        <span className="profile-stat-count">
                          {user.data.followers?.length
                            ? user.data.followers?.length
                            : 0}
                        </span>{' '}
                        người theo dõi
                      </li>
                    }
                    size="small"
                    className="follow-modal"
                  >
                    <Modal.Header>Danh sách người theo dõi</Modal.Header>
                    <Modal.Content scrolling>
                      <Modal.Description>
                        <List selection verticalAlign="middle" size="huge">
                          {followerList.length
                            ? followerList.map((user) => (
                                <FollowList
                                  key={user._id}
                                  user={user}
                                  closeModal={() =>
                                    setOpenFollowersModal(false)
                                  }
                                ></FollowList>
                              ))
                            : 'Không có người theo dõi'}
                        </List>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    closeIcon
                    onOpen={() => setOpenFollowingsModal(true)}
                    onClose={() => setOpenFollowingsModal(false)}
                    open={openFollowingsModal}
                    trigger={
                      <li onClick={handleGetFollowingList}>
                        <span className="profile-stat-count">
                          {user.data.followings?.length
                            ? user.data.followings.length
                            : 0}
                        </span>{' '}
                        đang theo dõi
                      </li>
                    }
                    size="small"
                    className="follow-modal"
                  >
                    <Modal.Header>Danh sách đang theo dõi</Modal.Header>
                    <Modal.Content scrolling>
                      <Modal.Description>
                        <List selection verticalAlign="middle" size="huge">
                          {followingList.length
                            ? followingList.map((user) => (
                                <FollowList
                                  key={user._id}
                                  user={user}
                                  closeModal={() =>
                                    setOpenFollowingsModal(false)
                                  }
                                ></FollowList>
                              ))
                            : 'Không theo dõi người nào'}
                        </List>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    closeIcon
                    onOpen={() => setOpenFriendsModal(true)}
                    onClose={() => setOpenFriendsModal(false)}
                    open={openFriendsModal}
                    trigger={
                      <li onClick={handleGetFriendList}>
                        <span className="profile-stat-count">
                          {user.data.friends?.length}
                        </span>{' '}
                        bạn bè
                      </li>
                    }
                    size="small"
                    className="follow-modal"
                  >
                    <Modal.Header>Danh sách bạn bè</Modal.Header>
                    <Modal.Content scrolling>
                      <Modal.Description>
                        <List selection verticalAlign="middle" size="huge">
                          {friends.length
                            ? friends.map((user) => (
                                <FollowList
                                  key={user._id}
                                  user={user}
                                  closeModal={() => setOpenFriendsModal(false)}
                                ></FollowList>
                              ))
                            : 'Không có bạn bè'}
                        </List>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                </ul>
              </div>
              <div className="profile-bio">
                <div className="profile-real-name mb-3">{user.data.name}</div>
                <div className="profile-bio-description">{user.data.bio}</div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="post-container">
            {user.data.postsCount === 0 ? (
              <div className="none-personal-post">
                <Divider horizontal>
                  Bạn không có bài viết nào, đăng bài viết mới?
                  <Button
                    as={Link}
                    to="/posts/upload"
                    className="profile-edit-btn none-post"
                    size="large"
                    icon
                    labelPosition="right"
                  >
                    Tạo bài viết
                    <Icon name="upload" />
                  </Button>
                </Divider>
              </div>
            ) : (
              <InfiniteScroll
                className="gallery"
                dataLength={user.data.posts.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
              >
                {user.data.posts?.map((post) => (
                  <Modal
                    key={post._id}
                    size="small"
                    trigger={
                      <div className="gallery-item">
                        <img
                          src={`${post.photo}`}
                          className="gallery-image"
                          alt=""
                        />

                        <div className="gallery-item-info">
                          <ul>
                            <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <Icon name="heart" /> {post.likes}
                            </li>
                            <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <Icon name="comment" /> {post.comments}
                            </li>
                          </ul>
                        </div>
                      </div>
                    }
                  >
                    <Post
                      post={{
                        ...post,
                        author: [
                          {
                            profilePicture: user.data.profilePicture,
                            username: user.data.username,
                            _id: user.data._id,
                          },
                        ],
                      }}
                    />
                  </Modal>
                ))}
              </InfiniteScroll>
            )}
          </div>
        </main>
        <Divider hidden></Divider>
      </Fragment>
      {/* )} */}
    </div>
  );
}

export default PersonalPage;
