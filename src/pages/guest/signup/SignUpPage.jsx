import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import UserService from '../../../services/UserService';
import '../auth.scss';

function SignUpPage() {
  const [error, setError] = useState({});
  const signUp = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      gender: '',
    },
    validationSchema: validateLogin,
    onSubmit: (signUp) => {
      UserService.signup(signUp)
        .then((res) => {
          localStorage.setItem(
            'user',
            JSON.stringify(res.data?.data ? res.data.data : null),
          );
          localStorage.setItem('token', res.data?.data?.token);

          if (res?.data?.role === 'ADMIN') {
            window.location.replace('/admin');
          } else {
            window.location.replace('/');
          }
        })
        .catch(({ response }) => {
          console.log(response.data);
          setError(response.data);
        });
    },
  });

  document.title = 'Đăng ký';

  return (
    <>
      <div className="signup-container">
        <div className="introduction">
          <div>
            <img src="/reddit-logo.png" alt="Mạng xã hội" className="logo" />
          </div>
          <p>Giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống</p>
        </div>
        <div className="login-content">
          <div className="login-title">Đăng ký</div>
          <div className="login-form">
            <form onSubmit={signUp.handleSubmit}>
              <div className="form-ele">
                <input
                  type="text"
                  name="name"
                  value={signUp.values.name}
                  className="input-name"
                  placeholder="Họ tên"
                  onBlur={signUp.handleBlur}
                  onChange={signUp.handleChange}
                />
                {signUp.touched.name && signUp.errors.name && (
                  <div className="text-danger" style={{ textAlign: 'left' }}>
                    {signUp.errors.name}
                  </div>
                )}
              </div>

              <div className="form-ele">
                <input
                  type="text"
                  name="username"
                  value={signUp.values.username}
                  className="input-name"
                  placeholder="Tên đăng nhập của bạn"
                  onBlur={signUp.handleBlur}
                  onChange={signUp.handleChange}
                />
                {signUp.touched.username && signUp.errors.username && (
                  <div className="text-danger" style={{ textAlign: 'left' }}>
                    {signUp.errors.username}
                  </div>
                )}
              </div>

              <div className="form-ele">
                <input
                  type="password"
                  name="password"
                  value={signUp.values.password}
                  className="input-password"
                  placeholder="Mật khẩu đăng nhập"
                  onBlur={signUp.handleBlur}
                  onChange={signUp.handleChange}
                />
                {signUp.touched.password && signUp.errors.password && (
                  <div className="text-danger" style={{ textAlign: 'left' }}>
                    {signUp.errors.password}
                  </div>
                )}
              </div>
              <div className="form-ele">
                <div className="ele-gender">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    <p style={{ textAlign: 'left' }}>Giới tính:</p>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    value={signUp.values.gender}
                    style={{ textAlign: 'left', fontSize: '20' }}
                    onBlur={signUp.handleBlur}
                    onChange={signUp.handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Khác"
                    />
                  </RadioGroup>
                </div>
                {signUp.touched.gender && signUp.errors.gender && (
                  <div className="text-danger" style={{ textAlign: 'left' }}>
                    {signUp.errors.gender}
                  </div>
                )}
              </div>

              <div className="form-ele">
                <button className="input-submit" type="submit">
                  Đăng Ký
                </button>
                {error && <p className="text-danger">{error.message}</p>}
              </div>
            </form>
            <Link to="/login">Quay lại trang đăng nhập</Link>
          </div>
        </div>
      </div>
    </>
  );
}

const validateLogin = Yup.object().shape({
  name: Yup.string().required('Chưa nhập họ tên'),
  username: Yup.string().required('Chưa nhập tên đăng nhập'),
  password: Yup.string().required('Chưa nhập mật khẩu'),
  gender: Yup.string().required('Chưa chọn giới tính'),
});

export default SignUpPage;
