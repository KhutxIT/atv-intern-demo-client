import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import Notification from '../../../utils/notification';
import UserService from '../../../services/UserService';
import {
  receiveUpdateUser,
  updateUserFromSocketCallback,
} from '../../../store/action/userAction';

function FriendRequestButton(props) {
  const { otherUser, updateOtherUser } = props;
  const user = useSelector(({ user }) => user);
  const socket = useSelector(({ socket }) => socket);
  const dispatch = useDispatch();
  // danh sách người(user list) mình đã gửi kết bạn
  const [friendRequestsSentList, setFriendRequestsSentList] = useState([]);
  const [friendState, setFriendState] = useState(3);
  const [openConfirmUnFriend, setOpenConfirmUnFriend] = useState(false);

  useEffect(() => {
    UserService.getFriendRequestSentList()
      .then((res) => setFriendRequestsSentList(res.data?.data))
      .catch(({ response }) => console.log(response.data));
  }, []);

  const handleSend = () => {
    socket.emit(
      '@newFriendRequest',
      { userSentId: user.data._id, userReceivedId: otherUser._id },
      (response) => {
        setFriendState(2);
        dispatch(updateUserFromSocketCallback(response));
      },
    );
  };

  const handleCancle = () => {
    socket.emit(
      '@removeFriendRequest',
      { userSentId: user.data._id, userReceivedId: otherUser._id },
      (response) => {
        setFriendState(3);
        dispatch(updateUserFromSocketCallback(response));
      },
    );
  };

  const handleUnFriend = () => {
    UserService.unFriend(otherUser._id)
      .then((res) => {
        Notification.success('Đã hủy kết bạn');
        dispatch(receiveUpdateUser(res.data?.data));
        updateOtherUser();
        setFriendState(3);
      })
      .catch(({ response }) => console.log(response.data));
  };

  // kiểm tra xem đã kết bạn, đã gửi lời mời, chưa gửi lời mời
  useEffect(() => {
    if (user.data.friends?.includes(otherUser._id)) {
      setFriendState(1);
    } else if (
      friendRequestsSentList.find(
        (friendRequest) => friendRequest.userReceivedId === otherUser._id,
      )
    ) {
      setFriendState(2);
    }
  }, [friendState, user.data._id, otherUser._id, user.data.friends]);

  if (friendState === 1) {
    return (
      <Modal
        closeIcon
        open={openConfirmUnFriend}
        trigger={
          <Button className="btn profile-edit-btn request-button" primary fluid>
            Hủy kết bạn
          </Button>
        }
        onClose={() => setOpenConfirmUnFriend(false)}
        onOpen={() => setOpenConfirmUnFriend(true)}
        size="tiny"
        className="unfriend-modal"
      >
        <Header>Hủy kết bạn</Header>
        <Modal.Content className="content">
          <p>Bạn có chắc chắn muốn hủy kết bạn với "{otherUser.name}"?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenConfirmUnFriend(false)}>
            <Icon name="remove" />Hủy
          </Button>
          <Button
            color="green"
            onClick={() => {
              setOpenConfirmUnFriend(false);
              handleUnFriend();
            }}
          >
            <Icon name="checkmark" />Xác nhận
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else if (friendState === 2) {
    return (
      <Button
        className="btn profile-edit-btn request-button"
        basic
        color="grey"
        onClick={handleCancle}
        fluid
      >
        Hủy lời mời
      </Button>
    );
  } else {
    return (
      <Button
        className="btn profile-edit-btn request-button"
        primary
        onClick={handleSend}
        fluid
      >
        Kết bạn
      </Button>
    );
  }
}

export default FriendRequestButton;
