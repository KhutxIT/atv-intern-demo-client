import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchNFT } from '../../../action/admin';
import ListEmpty from '../../../components/common/Empty/ListEmpty';

function ManageNFT() {
  const user = useSelector((state) => state.user?.data);
  const [query, setQuery] = useState('');
  const [nfts, setNfts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    searchNFT({}).then((res) => setNfts(res.data?.data));
  }, []);

  return (
    <div className="accountant-list">
      <div className="accountant-header">
        <h2>Danh sách NFT</h2>
        <div className="accountant-header__right">
          <p>Xin chào "{user.name}"</p>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-right">
        <button
          className="btn-create"
          type="button"
          onClick={() => history.push('/admin/nfts/create')}
        >
          Tạo NFT
        </button>
      </div>
      <div className="accountant-list-content">
        <div className="accountant-list-filter">
          <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
            <input
              type="text"
              placeholder="Tìm theo tên, miêu tả..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') setQuery(e.target.value);
              }}
            />
          </div>
        </div>
        {nfts.length === 0 ? (
          <ListEmpty
            image={
              <img
                src="https://social.dktcdn.net/facebook/files/search-empty.png"
                alt="img-empty"
              />
            }
            content="Không tìm thấy NFT nào"
          />
        ) : (
          <div>
            <table className="accountant-table">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Miêu tả</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {nfts?.map((nft) => {
                  return (
                    <tr
                      key={nft._id}
                      // onClick={() =>
                      //   history.push(`${match.path}/${nft._id}`)
                      // }
                    >
                      <td>
                        <img
                          src={nft.url}
                          alt={nft._id}
                          style={{ width: '50px', height: 'auto' }}
                        />
                      </td>
                      <td>{nft.name}</td>
                      <td>{nft.description}</td>
                      <td>
                        {moment(nft.createdAt).format('DD/MM/YYYY hh:mm')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageNFT;
