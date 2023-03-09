import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/index.scss';
import './styles/index2.scss';

import AdminLayout from './layout/admin/AdminLayout';
import UserLayout from './layout/user/UserLayout';
import LoginPage from './pages/guest/login/LoginPage';
import SignUpPage from './pages/guest/signup/SignUpPage';
import { setPersonalData } from './store/action/userAction';
import useForceUpdate from './utils/hooks';

function App() {
  const user = useSelector((state) => state.user?.data);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setPersonalData())
        .then(() => {})
        .catch(() => {
          localStorage.removeItem('token');
          forceUpdate();
        });
    }
  }, []);

  if (!token) {
    return (
      <Router>
        <Switch>
          <Route path={['/', '/login']} exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="*" component={LoginPage} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        {user?.role === 'ADMIN' && (
          <Route path={['/admin', '/', 'home']} component={AdminLayout} />
        )}
        {user?.role === 'USER' && (
          <Route path={['/', 'home']} component={UserLayout} />
        )}
      </Switch>
    </Router>
  );
}

export default App;
