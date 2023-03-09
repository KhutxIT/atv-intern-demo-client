import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { alertError, alertSuccess, toLocaleDateHHMM } from '../../../../action';
import SingleModal from '../../../../components/modal/singlemodal/SingleModal';
import { updateAccountStatus } from '../../../../services/AdminService';
import UserService from '../../../../services/UserService';
import './AccountantDetail.css';

export default function AccountantDetail() {
  const history = useHistory();
  const match = useRouteMatch();
  const [account, setAccount] = useState({});
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    UserService.getUser(id)
      .then((res) => {
        setAccount(res.data?.data);
      })
      .catch(({ res }) => console.log(res.data?.error?.message));
  }, [id]);

  let action =
    account?.accountStatus === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản';

  const onChangeAccountStatus = () => {
    const status = account?.accountStatus === 'active' ? 'lock' : 'active';
    updateAccountStatus(account._id, status)
      .then((res) => {
        if (res.status === 200) {
          alertSuccess(`${action} thành công`);
          setAccount(res.data.data)
        } else {
          alertError('Có lỗi xảy ra!');
        }
      })
      .catch((res) => {
        alertError('Có lỗi xảy ra!');
      });
  };

  return (
    <div className="accountant-add">
      <div
        className="accountant-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf('/'))}`,
          )
        }
      >
        <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: '10px' }} />
        <span>Danh sách tài khoản</span>
      </div>
      <div className="accountant-heading">
        <h2>Thông tin chi tiết tài khoản</h2>
      </div>
      <form onSubmit={onChangeAccountStatus}>
        <div className="accountant-content">
          <div className="accountant-info">
            <h3>Thông tin chung</h3>
            <div>
              <div>
                <p>Tên</p>
                <div>{account?.name}</div>
              </div>
              <div>
                <p>Tên đăng nhập</p>
                <div>{account?.username}</div>
              </div>
              <div>
                <p>	Trạng thái hoạt động</p>
                <div>{account?.isOnline ? 'Online' : 'Offline'}</div>
              </div>
              <div>
                <p>	Trạng thái tài khoản</p>
                <div>{account?.accountStatus === 'active' ? 'Bình thường' : 'Đã khóa'}</div>
              </div>
              <div>
                <p>	Ngày tạo</p>
                <div>{toLocaleDateHHMM(account?.date)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="accountant-add-submit">
          <button className="mr-2 btn-cancle" type="button" onClick={() => history.goBack()}>Quay lại</button>
          {account?.accountStatus === 'active' ? (
            <button
              className="btn-delete"
              type="button"
              onClick={() => setOpen(true)}
            >
              {action}
            </button>
          ) : null}
          {account?.accountStatus === 'lock' ? (
            <button
              className="btn-delete"
              type="button"
              onClick={() => setOpen(true)}
            >
              {action}
            </button>
          ) : null}
        </div>
      </form>
      <SingleModal
        open={open}
        setOpen={setOpen}
        title={`Xác nhận ${action}`}
        onConfirm={onChangeAccountStatus}
      ></SingleModal>
    </div>
  );
}
