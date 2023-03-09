import 'moment/locale/vi';
import moment from 'moment/moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, List } from 'semantic-ui-react';
import UserService from '../../services/UserService';

moment().locale('vi');

function NewUsersList(props) {
  const [users, setUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const limit = 5;

  useEffect(() => {
    UserService.searchUser({ offset: 0, limit: limit })
      .then(({ data }) => {
        setUsers(data.data ? data.data : null);
      })
      .catch(({ response }) => {
        console.log(response.data?.message);
      });
    UserService.countSearch({})
      .then(({ data }) => {
        setTotalUser(data.data ? data.data : null);
      })
      .catch(({ response }) => {
        console.log(response.data?.message);
      });
  }, []);

  const fetchMoreUsers = () => {
    UserService.searchUser({ offset: users?.length + 1, limit: limit })
      .then(({ data }) => {
        let tmp = [];
        for (let item of users) tmp.push(item);
        setUsers(tmp.concat(data?.data));
      })
      .catch(({ response }) => {
        console.log(response.data?.message);
      });
  };

  return (
    <Fragment>
      <List size="big">
        {
          <List.Item>
            <List.Content>
              <List.Header>Tổng người dùng: {totalUser}</List.Header>
            </List.Content>
          </List.Item>
        }
        {users.map((user) => (
          <List.Item key={user._id}>
            <Image avatar src={user.profilePicture} />
            <List.Content>
              <List.Header as={Link} to={`/profile/${user._id}`}>
                {user.username}
              </List.Header>

              <span style={{ color: '#757575' }}>
                Tham gia {moment(user.date).fromNow()}
              </span>
            </List.Content>
          </List.Item>
        ))}
        {totalUser - users.length > 0 ? (
          <Button fluid onClick={fetchMoreUsers}>
            Tải thêm thông tin
          </Button>
        ) : null}
      </List>
    </Fragment>
  );
}

export default NewUsersList;
