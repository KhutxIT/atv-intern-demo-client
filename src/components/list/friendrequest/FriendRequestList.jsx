import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image, List } from 'semantic-ui-react';
import UserService from '../../../services/UserService';
import { receiveUpdateUser } from '../../../store/action/userAction';

export default function FriendRequestList({ user, closeModal }) {
  const customer = useSelector(({ user }) => user);
  // trạng thái đã đồng ý hoặc từ chối hay chưa
  const [friendRequestState, setFriendRequestState] = useState(1);
  const dispatch = useDispatch();

  const handleAccept = () => {
    UserService.confirmFriendRequest(user._id)
      .then((res) => {
        setFriendRequestState(2);
        dispatch(
          receiveUpdateUser({
            ...customer,
            totalFriendRequestReceived: customer.data.totalFriendRequestReceived - 1,
          }),
        );
      })
      .catch(({ response }) => console.log(response.data));
  };
  const handleReject = () => {
    UserService.rejectFriendRequest(user._id)
      .then((res) => {
        setFriendRequestState(3);
        dispatch(
          receiveUpdateUser({
            ...customer,
            totalFriendRequestReceived: customer.data.totalFriendRequestReceived - 1,
          }),
        );
      })
      .catch(({ response }) => console.log(response.data));
  };

  let friendRequestRender = null;
  if (friendRequestState === 2) {
    friendRequestRender = <p>Đã kết bạn</p>;
  } else if (friendRequestState === 3) {
    friendRequestRender = <p>Đã từ chối</p>;
  } else {
    friendRequestRender = (
      <Fragment>
        <Button
          className="btn profile-edit-btn"
          primary
          onClick={handleAccept}
          fluid
        >
          Đồng ý
        </Button>
        <Button
          className="btn profile-edit-btn"
          basic
          color="grey"
          onClick={handleReject}
          fluid
        >
          Từ chối
        </Button>
      </Fragment>
    );
  }

  return (
    <List.Item>
      <Fragment>
        <List.Content floated="right" className="friend-request-item">
          {friendRequestRender}
        </List.Content>
        <Image
          avatar
          src={user.profilePicture}
          onClick={() => {
            closeModal && closeModal();
            console.log('test');
          }}
        />
        <List.Content
          onClick={() => {
            closeModal && closeModal();
            console.log('test');
          }}
          as={Link}
          to={`/profile/${user._id}`}
          style={{ color: '#3d3d3d' }}
        >
          {user.username}
        </List.Content>
      </Fragment>
    </List.Item>
  );
}
