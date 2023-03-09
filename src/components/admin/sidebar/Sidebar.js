import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faGauge } from '@fortawesome/free-solid-svg-icons';
import SingleModal from '../../modal/singlemodal/SingleModal';
import UserService from '../../../services/UserService';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function SidebarAcc() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="#">
            <img className="sapo-logo" src="/reddit-logo.png" alt="Sapo-logo" />
          </Link>
        </div>
        <div>Admin</div>
      </div>
      <div className="sidebar-container">
        <ul className="sidebar-list">
          <li className="sidebar-list_item">
            <Link className="sidebar-list_link" to="/admin/dashboard">
              <FontAwesomeIcon
                icon={faGauge}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              Hệ thống
            </Link>
          </li>
          <li className="sidebar-list_item">
            <Link className="sidebar-list_link" to="/admin/users">
              <FontAwesomeIcon
                icon={faUser}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              Tài khoản
            </Link>
          </li>
          <li className="sidebar-list_item">
            <Link className="sidebar-list_link" to="/admin/nfts">
              <FontAwesomeIcon
                icon={faUser}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              NFT
            </Link>
          </li>
          <li className="sidebar-list_item">
            <span
              className="sidebar-list_link"
              onClick={() => setOpenLogoutModal(true)}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              Đăng xuất
            </span>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer"></div>
      <SingleModal
        open={openLogoutModal}
        setOpen={setOpenLogoutModal}
        title="Bạn có chắc muốn đăng xuất"
        onConfirm={UserService.logout}
      />
    </div>
  );
}

export default SidebarAcc;
