import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Divider, Icon, List, Message, Modal } from 'semantic-ui-react';
import FollowButton from '../../../components/button/followbutton/FollowButton';
import FriendRequestButton from '../../../components/button/friendrequestbutton/FriendRequestButton';
import FollowList from '../../../components/list/followlist/FollowList';
import Post from '../../../components/post/Post';
import { DEFAULT_TITLE } from '../../../constant';
import PostService from '../../../services/PostService';
import UserService from '../../../services/UserService';
import { receiveUpdateUser } from '../../../store/action/userAction';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import '../personal/style.scss';

function ProfilePage() {
  const { _id } = useParams();
  const customer = useSelector(({ user }) => user);
  const history = useHistory();
  if (_id === customer.data._id) {
    history.push('/personal');
  }

  const [user, setUser] = useState({ name: '' });
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);
  const [posts, setPosts] = useState([]);

  // danh sách người gửi kết bạn đến mình
  const [userSentFriendRequest, setUserSentFriendRequest] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getUser(_id)
      .then((res) => setUser(res.data?.data))
      .catch(({ res }) => {
        console.log(res.data?.message);
        setUser(null);
      });
    UserService.getUserSentFriendRequest()
      .then((res) => {
        setUserSentFriendRequest(res.data?.data);
      })
      .catch(({ response }) => console.log(response.data));
    if (user._id) {
      PostService.getAllUserPosts(user._id)
        .then((res) => {
          setPosts(res.data?.data);
        })
        .catch(({ response }) => console.log(response.data));
    }
  }, [_id, followerList.length, followingList.length, user._id]);

  useEffect(() => {
    document.title = user?.name ? user?.name : DEFAULT_TITLE;
  }, [user?.name]);

  const handleGetFollowingList = () => {
    UserService.getFollowingList(_id)
      .then((res) => setFollowingList(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  const handleGetFollowerList = () => {
    UserService.getFollowerList(_id)
      .then((res) => setFollowerList(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  const handleGetFriendList = () => {
    UserService.getFriendList(_id)
      .then((res) => setFriends(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  // chấp nhận kết bạn thì cập nhật lại redux state - user,
  // và cập nhật lại danh sách người gửi kết bạn đến mình
  const handleAccept = () => {
    UserService.confirmFriendRequest(user._id)
      .then((res) => {
        dispatch(
          receiveUpdateUser({
            ...res.data?.data,
            totalFriendRequestReceived:
              customer.data.totalFriendRequestReceived - 1,
          }),
        );
        UserService.getUserSentFriendRequest()
          .then((res) => {
            setUserSentFriendRequest(res.data?.data);
          })
          .catch(({ response }) => console.log(response.data));
      })
      .catch(({ response }) => console.log(response.data));
  };
  // cập nhật lại redux state - user,
  // và cập nhật lại danh sách người gửi kết bạn đến mình
  const handleReject = () => {
    UserService.rejectFriendRequest(user._id)
      .then((res) => {
        dispatch(
          receiveUpdateUser({
            ...customer,
            totalFriendRequestReceived:
              customer.data.totalFriendRequestReceived - 1,
          }),
        );
        UserService.getUserSentFriendRequest()
          .then((res) => {
            setUserSentFriendRequest(res.data?.data);
          })
          .catch(({ response }) => console.log(response.data));
      })
      .catch(({ response }) => console.log(response.data));
  };

  const updateUser = () => {
    UserService.getUser(_id)
      .then((res) => setUser(res.data?.data))
      .catch(({ res }) => console.log(res.data?.message));
  };

  if (!user) return <NotFoundPage />;

  return (
    <div className="main">
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={user.profilePicture} alt={user.username} />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{user.username}</h1>

              <FollowButton
                userId={_id}
                updateUserFollowed={updateUser}
              ></FollowButton>

              {/* nếu người dùng khác đã gửi kết bạn đến mình thì không hiển thị button trạng thái bạn bè */}
              {userSentFriendRequest.find((item) => item._id === user._id) ? (
                <div className="khutx-flex">
                  <Button
                    className="btn profile-edit-btn request-button"
                    primary
                    onClick={handleAccept}
                    fluid
                  >
                    Đồng ý kết bạn
                  </Button>
                  <Button
                    className="btn profile-edit-btn request-button"
                    basic
                    color="grey"
                    onClick={handleReject}
                    fluid
                  >
                    Từ chối kết bạn
                  </Button>
                </div>
              ) : (
                <FriendRequestButton
                  otherUser={user}
                  updateOtherUser={updateUser}
                />
              )}
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">{posts?.length}</span> bài đăng
                </li>
                <Modal
                  closeIcon
                  onOpen={() => setOpenFollowersModal(true)}
                  onClose={() => setOpenFollowersModal(false)}
                  open={openFollowersModal}
                  trigger={
                    <li onClick={handleGetFollowerList}>
                      <span className="profile-stat-count">
                        {user.followers?.length ? user.followers?.length : 0}
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
                                closeModal={() => setOpenFollowersModal(false)}
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
                        {user.followings?.length ? user.followings.length : 0}
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
                                closeModal={() => setOpenFollowingsModal(false)}
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
                        {user.friends?.length}
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
              <div className="profile-real-name">{user.name}</div>
              {/* <div className="profile-bio-description">
                <Linkify options={linkifyOptions}>{user.gender}</Linkify>
              </div> */}
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="post-container">
          {posts.length && posts.length > 0 ? (
            <div className="gallery">
              {posts.map((post) => (
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
                          profilePicture: user.profilePicture,
                          username: user.username,
                          _id: user._id,
                        },
                      ],
                    }}
                  />
                </Modal>
              ))}
            </div>
          ) : (
            <div className="none-personal-post">
              <Divider horizontal>Không có bài viết nào</Divider>
            </div>
          )}
        </div>
      </main>
      <Divider hidden></Divider>
    </div>
  );
}

export default ProfilePage;
