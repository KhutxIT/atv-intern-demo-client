import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import FollowButton from '../button/followbutton/FollowButton';

export default function FollowingFollowerList({
  user: { _id, username, profilePicture },
}) {
  return (
    <List.Item>
      <List.Content floated="right">
        <FollowButton userId={_id}></FollowButton>
      </List.Content>
      <Image avatar src={`${profilePicture}`} />
      <List.Content as={Link} to={'/' + _id} style={{ color: '#3d3d3d' }}>
        {username}
      </List.Content>
    </List.Item>
  );
}
