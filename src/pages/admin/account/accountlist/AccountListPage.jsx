import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import UserService from '../../../../services/UserService';
import './AccountListPage.css';

const ITEM_PER_PAGE = 10;

function AccountListPage() {
  const user = useSelector((state) => state.user?.data);
  const match = useRouteMatch();
  const history = useHistory();

  const [accountants, setAccountants] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    UserService.searchUser({
      query: query,
      offset: 0,
      limit: ITEM_PER_PAGE,
    })
      .then((res) => {
        setAccountants(res.data?.data);
      })
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    UserService.countSearch({ query })
      .then((res) => {
        setTotalItem(res.data?.data);
      })
      .catch((err) => console.log(err));
  }, [query, totalItem]);

  const handlePaginationChange = (event, page) => {
    setPage(page);

    UserService.searchUser({
      query: query,
      offset: page - 1,
      limit: ITEM_PER_PAGE,
    })
      .then((res) => {
        setAccountants(res.data?.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="accountant-list">
      <div className="accountant-header">
        <h2>Danh sách tài khoản</h2>
        <div className="accountant-header__right">
          <p>Xin chào "{user.name}"</p>
        </div>
      </div>
      <div className="accountant-list-content">
        <div className="accountant-list-filter">
          <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
            <input
              type="text"
              placeholder="Tìm theo tên, trạng thái hoạt động, trạng thái tài khoản...  "
              onKeyPress={(e) => {
                if (e.key === 'Enter') setQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <table className="accountant-table">
            <thead>
              <tr>
                <th>Tên người dùng</th>
                <th>Tên đăng nhập</th>
                <th>Trạng thái hoạt động</th>
                <th>Trạng thái tài khoản</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {accountants?.map((accountant) => {
                return (
                  <tr
                    key={accountant._id}
                    onClick={() =>
                      history.push(`${match.path}/${accountant._id}`)
                    }
                  >
                    <td>{accountant.name}</td>
                    <td>{accountant.username}</td>
                    <td>{accountant.isOnline ? 'Online' : 'Offline'}</td>
                    <td>{accountant.accountStatus === 'active' ? 'Bình thường' : 'Đã khóa'}</td>
                    <td>
                      {moment(accountant.date).format('DD/MM/YYYY hh:mm')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountListPage;
