import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Dropdown,
  Icon,
  Image,
  Label,
  List,
  Menu,
  Modal,
} from 'semantic-ui-react';
import UserService from '../../services/UserService';
import { notificationActions } from '../../store/action/notificationAction';
import FriendRequestList from '../list/friendrequest/FriendRequestList';
import { NotificationPopup } from '../notification/NotificationPopup';
import SuggestionSearch from '../suggestionsearch/SuggestionSearch';
import './UserNavbar.scss';

function UserNavbar(props) {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([
    {
      key: 'user',
      text: 'Trang cá nhân',
      icon: 'user',
      value: 'personal',
      active: false,
    },
    {
      key: 'sign-out',
      text: 'Đăng xuất',
      icon: 'sign out',
      value: 'signOut',
      active: false,
    },
  ]);
  // danh sách người gửi kết bạn đến mình
  const [userSentFriendRequest, setUserSentFriendRequest] = useState([]);
  const [openFriendRequestList, setOpenFriendRequestList] = useState(false);
  const history = useHistory();
  const user = useSelector(({ user }) => user);
  const notifications = useSelector(
    ({ notification }) => notification.notifications,
  );
  const dispatch = useDispatch();

  const getUserSentFriendRequest = () => {
    UserService.getUserSentFriendRequest()
      .then((res) => {
        setUserSentFriendRequest(res.data?.data);
      })
      .catch(({ response }) => console.log(response.data));
  };

  const handleChange = (e, { value }) => {
    if (value === 'signOut') {
      UserService.logout();
      return;
    }
    history.push('/' + value);
    setValue(value);
  };

  const handleNotificationPopupToggle = (e) => {
    e.stopPropagation();
    const ids = notifications.filter((e) => !e.read).map((e) => e._id);

    dispatch(notificationActions.toggleNotificationPopup());

    if (!notifications.length) {
      dispatch(
        notificationActions.fetchNotifications({ initialFetch: true }, ids),
      );
    } else {
      const lastId = notifications[notifications.length - 1]._id;
      dispatch(
        notificationActions.fetchNotifications(
          { initialFetch: false, lastId },
          ids,
        ),
      );
    }
  };

  const friendRequestsModalTrigger =
    user.data.totalFriendRequestReceived &&
    user.data.totalFriendRequestReceived !== 0 ? (
      <div onClick={getUserSentFriendRequest}>
        <Icon name="group" size="large" />
        <Label color="red" style={{ margin: 0 }}>
          {user.data.totalFriendRequestReceived}
        </Label>
      </div>
    ) : (
      <div onClick={getUserSentFriendRequest}>
        <Icon name="group" size="large" />
        <Label color="grey" style={{ margin: 0 }}>
          0
        </Label>
      </div>
    );

  return (
    <div className="main-navbar">
      <div className="nav-item logo" style={{ fontSize: '15px' }}>
        <Link to={'/'} className="d-flex align-items-center"><img src="/reddit-logo.png" alt="Mạng xã hội" />MẠNG XÃ HỘI</Link>
      </div>
      <div className="nav-item">
        <SuggestionSearch />
      </div>
      <div className="nav-item nav-menu">
        <Menu borderless className="top-menu">
          <Menu.Menu className="nav-container">
            {/* 5 */}
            <Menu.Menu position="right">
              <Menu.Item
                active={history.location.pathname === '/'}
                as={Link}
                to="/"
              >
                <Icon name="home" size="large" />
              </Menu.Item>
              <Menu.Item as={Link}>
                <Modal
                  closeIcon
                  onOpen={() => setOpenFriendRequestList(true)}
                  onClose={() => setOpenFriendRequestList(false)}
                  open={openFriendRequestList}
                  trigger={friendRequestsModalTrigger}
                  size="small"
                className="friend-request-modal"
                >
                  <Modal.Header
                    icon="archive"
                    content="Danh sách lời mời kết bạn"
                  ></Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      <List selection verticalAlign="middle" size="huge">
                        {userSentFriendRequest.length
                          ? userSentFriendRequest.map((user) => (
                              <FriendRequestList
                                key={user._id}
                                user={user}
                                closeModal={() =>
                                  setOpenFriendRequestList(false)
                                }
                              ></FriendRequestList>
                            ))
                          : 'Không có lời mời kết bạn'}
                      </List>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Menu.Item>
              <Menu.Item
                active={history.location.pathname.startsWith('/messengers')}
                as={Link}
                to="/messengers"
              >
                <Icon name="facebook messenger" size="large" />
                {user.data.messagesCount !== 0 ? (
                  <Label color="red" style={{ margin: 0 }}>
                    {user.data.messagesCount}
                  </Label>
                ) : (
                  <Label color="grey" style={{ margin: 0 }}>
                    0
                  </Label>
                )}
              </Menu.Item>

              <NotificationPopup>
                <Menu.Item onClick={(e) => handleNotificationPopupToggle(e)}>
                  <Icon name="bell" size="large" />
                  {user.data.notificationsCount !== 0 ? (
                    <Label color="red" style={{ margin: 0 }}>
                      {user.data.notificationsCount}
                    </Label>
                  ) : (
                    <Label color="grey" style={{ margin: 0 }}>
                      0
                    </Label>
                  )}
                </Menu.Item>
              </NotificationPopup>

              {/* 7*/}
              <Menu.Item
                active={history.location.pathname.startsWith('/personal')}
                name="profilePicture"
                id="profilePicture-container"
              >
                <Dropdown
                  trigger={trigger(user.data.profilePicture)}
                  selectOnNavigation={false}
                  options={options}
                  icon={null}
                  onClose={() => setValue('')}
                  onChange={handleChange}
                  value={value}
                />
              </Menu.Item>
              <Menu.Item
                id="icon-container"
                active={history.location.pathname.startsWith('/personal')}
              >
                <Dropdown
                  trigger={<Icon name="user" size="large" />}
                  selectOnNavigation={false}
                  options={options}
                  icon={null}
                  onClose={() => setValue('')}
                  onChange={handleChange}
                  value={value}
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu.Menu>
        </Menu>
      </div>
      {/* {answeringModal.isOpen ? <AnsweringModal></AnsweringModal> : null} */}
    </div>
  );
}

function trigger(src, name) {
  return (
    <span>
      <Image size="mini" avatar src={src} /> {name}
    </span>
  );
}

export default UserNavbar;
