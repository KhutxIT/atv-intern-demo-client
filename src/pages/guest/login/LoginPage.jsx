import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import UserService from '../../../services/UserService';
import '../auth.scss';

function LoginPage() {
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const login = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: (login) => {
      UserService.login(login.username, login.password)
        .then((res) => {
          localStorage.setItem('token', res.data?.data?.token);
          if (res?.data?.data?.role === 'ADMIN') {
            window.location.replace('/admin');
          } else {
            window.location.replace('/');
          }
        })
        .catch(({ response }) => {
          if (response.status === 403) {
            setOpen(true);
          } else setError(response?.data);
        });
    },
  });

  document.title = 'Đăng nhập';

  return (
    <>
      <div className="login-container">
        <div className="introduction">
          <div>
            <img src="/reddit-logo.png" alt="Mạng xã hội" className="logo" />
          </div>
          <p>Giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống</p>
        </div>
        <div className="login-content">
          <div className="login-title">Đăng nhập</div>
          <div className="login-form">
            <form onSubmit={login.handleSubmit}>
              <div className="form-ele">
                <input
                  type="text"
                  name="username"
                  className="input-name"
                  placeholder="Tên đăng nhập của bạn"
                  onBlur={login.handleBlur}
                  onChange={login.handleChange}
                />
                {login.touched.username && login.errors.username && (
                  <div
                    className="text-danger"
                    style={{ paddingTop: '5px', textAlign: 'left' }}
                  >
                    {login.errors.username}
                  </div>
                )}
              </div>

              <div className="form-ele">
                <input
                  type="password"
                  name="password"
                  className="input-password"
                  placeholder="Mật khẩu đăng nhập"
                  onBlur={login.handleBlur}
                  onChange={login.handleChange}
                />
                {login.touched.password && login.errors.password && (
                  <div
                    className="text-danger"
                    style={{ paddingTop: '5px', textAlign: 'left' }}
                  >
                    {login.errors.password}
                  </div>
                )}
              </div>

              <div className="form-ele">
                <button className="input-submit" type="submit">
                  Đăng Nhập
                </button>
                {error && <p className="text-danger">{error.message}</p>}
              </div>
            </form>
          </div>
          <div>
            <span>
              Chưa có tài khoản? <Link to="/signup">Tạo tài khoản</Link>
            </span>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle
          disableTypography
          className="d-flex justify-content-between align-items-center"
        >
          <h2>Thông báo</h2>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div>Đăng nhập không thành công. Tài khoản của bạn đã bị khóa do vi phạm các nguyên tắc cộng đồng của chúng tôi</div>
          <div>Vui lòng sử dụng tài khoản khác hoặc <Link to="/signup">Tạo tài khoản mới</Link> để tiếp tục</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const validateLogin = Yup.object().shape({
  username: Yup.string().required('Chưa nhập tên đăng nhập'),
  password: Yup.string().required('Chưa nhập mật khẩu'),
});

export default LoginPage;
