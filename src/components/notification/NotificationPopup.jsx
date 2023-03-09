import React from 'react';
import {
  Popup,
  Grid,
  Card,
  Feed,
  Image,
  Divider,
  Header,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { notificationActions } from '../../store/action/notificationAction';
import InfiniteScroll from 'react-infinite-scroll-component';
import { convertDateToFromNow } from '../../utils';

function postLikeNotification({ _id, createdAt, sender, post }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>
            vừa thả tim vào bài viết của bạn
          </span>{' '}
          <Link to={`/post/${post[0]._id}`}>post</Link>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function commentLikeNotification({ _id, createdAt, sender, comment, post }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>thích bình luận của bạn</span>{' '}
          "{comment[0].text}" <span style={{ fontWeight: 'normal' }}>trên</span>{' '}
          <Link to={`/post/${post[0]._id}`}>bài viết</Link>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function likeCommentReplyNotification({ _id, createdAt, sender, reply, post }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>liked your reply</span>{' '}
          {reply[0].text} <span style={{ fontWeight: 'normal' }}>on</span>{' '}
          <Link to={`/post/${post[0]._id}`}>post</Link>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function postTaggedNotification({ _id, createdAt, sender, post }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}> tagged you on</span>{' '}
          <Link to={`/post/${post[0]._id}`}>post</Link>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function commentTaggedNotification({ _id, createdAt, sender, post }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>mentioned you on</span>{' '}
          <Link to={`/post/${post[0]._id}`}>post</Link>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function addCommentNotification({ _id, createdAt, sender, comment, post }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>vừa bình luận </span> "
          {comment[0].text}" <Link to={`/post/${post[0]._id}`}>bài viết</Link>
          {" "}<span style={{ fontWeight: 'normal' }}>của bạn</span>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function followNotification({ _id, createdAt, sender }) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>vừa theo dõi bạn</span>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}

function commentReplyNotification({
  _id,
  createdAt,
  post,
  sender,
  reply,
  comment,
}) {
  return (
    <Feed.Event key={_id}>
      <Feed.Label image={`${sender[0].profilePicture}`} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={'/' + sender[0].username}>
            {sender[0].username}
          </Feed.User>{' '}
          <span style={{ fontWeight: 'normal' }}>replied</span> {reply[0].text}{' '}
          <span style={{ fontWeight: 'normal' }}>to</span> {comment[0].text}
          <span style={{ fontWeight: 'normal' }}> on </span>
          <Link to={`/post/${post[0]._id}`}>post</Link>
          <Feed.Date>{convertDateToFromNow(createdAt)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/post/${post[0]._id}`}>
            <Image rounded src={`${post[0].photo}`} />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

const NotificationPopup = ({
  dispatch,
  isOpen,
  children,
  notifications,
  allNotificationsCount,
}) => {
  const notificationsFeed = notifications.map((notification) => {
    if (notification.type === 'like_post') {
      return postLikeNotification(notification);
    } else if (notification.type === 'follow') {
      return followNotification(notification);
    } else if (notification.type === 'post_comment') {
      return addCommentNotification(notification);
    } else if (notification.type === 'comment_reply') {
      return commentReplyNotification(notification);
    } else if (notification.type === 'comment_tagged') {
      return commentTaggedNotification(notification);
    } else if (notification.type === 'post_tagged') {
      return postTaggedNotification(notification);
    } else if (notification.type === 'like_commentReply') {
      return likeCommentReplyNotification(notification);
    } else {
      return commentLikeNotification(notification);
    }
  });
  const fetchData = () => {
    const lastId = notifications[notifications.length - 1]._id;
    dispatch(
      notificationActions.fetchNotifications({ initialFetch: false, lastId }),
    );
  };
  return (
    <Popup
      trigger={children}
      on="click"
      position="top center"
      style={{ border: 'none' }}
      open={isOpen}
    >
      <Grid centered divided columns="equal">
        <Card
          id="scrollableDiv"
          style={{ overflow: 'auto', maxHeight: '300px' }}
        >
          <Card.Content>
            {' '}
            <InfiniteScroll
              dataLength={notificationsFeed.length} //This is important field to render the next data
              next={fetchData}
              scrollableTarget="scrollableDiv"
              hasMore={
                allNotificationsCount === notifications.length ? false : true
              }
              loader={<h4>Loading...</h4>}
              endMessage={
                <Divider horizontal>
                  <Header as="h5">Không có thông báo nào nữa</Header>
                </Divider>
              }
            >
              <Feed>{notificationsFeed} </Feed>
            </InfiniteScroll>
          </Card.Content>
        </Card>
      </Grid>
    </Popup>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.notification.isOpen,
  notifications: state.notification.notifications,
  allNotificationsCount: state.notification.allNotificationsCount,
});

const connectNotificationPopup = connect(mapStateToProps)(NotificationPopup);
export { connectNotificationPopup as NotificationPopup };
