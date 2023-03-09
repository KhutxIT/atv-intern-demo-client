import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Image, List } from 'semantic-ui-react';
import FollowButton from '../../button/followbutton/FollowButton';

export default function FollowList({ user, closeModal, open, setOpen }) {
  const customer = useSelector(({ user }) => user);
  const history = useHistory();
  return (
    <List.Item>
      <div
        onClick={() => {
          closeModal?.();
          history.push(`/profile/${user._id}`);
        }}
      >
        <List.Content floated="right">
          <Button
            className="btn profile-edit-btn"
            primary
            onClick={() => {
              closeModal?.();
              history.push(`/profile/${user._id}`);
            }}
            fluid
          >
            Xem trang cá nhân
          </Button>
        </List.Content>
        <Image
          avatar
          src={user.profilePicture}
          onClick={() => {
            closeModal && closeModal();
            history.push(`/profile/${user._id}`);
          }}
        />
        <List.Content
          as={Link}
          to={`/profile/${user._id}`}
          style={{ color: '#3d3d3d' }}
          onClick={() => {
            closeModal && closeModal();
          }}
        >
          {user.username}
          {customer.data._id === user._id ? ' - Bạn' : null}
        </List.Content>
      </div>
    </List.Item>
  );
}
