import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import UserService from '../../../services/UserService';
import {
  receiveUpdateUser,
  updateUser2,
} from '../../../store/action/userAction';

function FollowButton(props) {
  const { userId, updateUserFollowed } = props;
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleFollow = () => {
    UserService.follow(user.data?._id, userId)
      .then((res) => dispatch(receiveUpdateUser(res.data?.data)))
      .catch(({ response }) => console.log(response.data));
    updateUserFollowed && updateUserFollowed();
  };

  const handleUnFollow = () => {
    UserService.unFollow(user.data?._id, userId)
      .then((res) => dispatch(receiveUpdateUser(res.data?.data)))
      .catch(({ response }) => console.log(response.data));
    updateUserFollowed && updateUserFollowed();
  };

  return user.data.followings?.includes(userId) ? (
    <Button
      className="btn profile-edit-btn request-button"
      basic
      color="grey"
      onClick={handleUnFollow}
      fluid
    >
      Bỏ theo dõi
    </Button>
  ) : (
    <Button
      className="btn profile-edit-btn request-button"
      primary
      onClick={handleFollow}
      fluid
    >
      Theo dõi
    </Button>
  );
}

export default FollowButton;
