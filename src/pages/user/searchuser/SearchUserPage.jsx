import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import ListEmpty from '../../../components/common/Empty/ListEmpty';
import FollowList from '../../../components/list/followlist/FollowList';
import UserService from '../../../services/UserService';
import './searchUser.scss';

function SearchUserPage() {
  const history = useHistory();
  const query = history.location?.state?.query || null;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.searchUser({ query })
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch(({ response }) => {
        console.log(response.data?.message);
      });
  }, [query]);

  return (
    <div className="container mt-5 search-user">
      {/* <h1 style={{ fontSize: '18px' }}>Kết quả tìm kiếm</h1> */}
      {users.length && users.length > 0 ? (
        users.map((user) => (
          <React.Fragment key={user._id}>
            <List
              selection
              verticalAlign="middle"
              size="huge"
              onItemClick={() => history.push(`/profile/${user._id}`)}
            >
              <FollowList user={user} />
            </List>
          </React.Fragment>
        ))
      ) : (
        <ListEmpty
          image={
            <img
              src="https://social.dktcdn.net/facebook/files/search-empty.png"
              alt="img-empty"
            />
          }
          content="Không tìm thấy ai đó"
        />
      )}
    </div>
  );
}

export default SearchUserPage;
