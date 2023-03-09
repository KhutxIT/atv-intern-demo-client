import React, { Fragment, Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/user/home/HomePage';
import UserNavbar from '../../components/navbar/UserNavbar';
import MessengerPage from '../../pages/user/messenger/MessengerPage';
import ProfilePage from '../../pages/user/profile/ProfilePage';
import PersonalPage from '../../pages/user/personal/PersonalPage';
import NotFoundPage from '../../pages/user/NotFoundPage/NotFoundPage';
import { useDispatch } from 'react-redux';
import { listeningEvent } from '../../store/action/socketAction';
import PostUploadPage from '../../pages/user/postupload/PostUploadPage';
import PostPage from '../../pages/user/post/PostPage';
import SearchUserPage from '../../pages/user/searchuser/SearchUserPage';

const UserLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listeningEvent());
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Fragment>
        <UserNavbar />
        <Switch>
          <Route path="/messengers" exact component={MessengerPage} />
          <Route path="/personal" exact component={PersonalPage} />
          <Route path="/profile/:_id" exact component={ProfilePage} />
          <Route path="/posts/upload" exact component={PostUploadPage} />
          <Route path="/search-user" exact component={SearchUserPage} />
          <Route path="/post/:_id" exact component={PostPage} />
          <Route path="/" exact component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Fragment>
    </Suspense>
  );
};

export default UserLayout;
