import call_api from './Request';

const NOTIFICATION_API_ROUTE_V1 = '/v1/notifications';

const readNotifications = (notificationIds) => {
  return call_api({
    url: `${NOTIFICATION_API_ROUTE_V1}`,
    method: 'PUT',
    data: {
      notificationIds,
    },
  });
};

const fetchNotifications = (queryOptions) => {
  return call_api({
    url: `${NOTIFICATION_API_ROUTE_V1}`,
    method: 'GET',
    params: queryOptions,
    data: {
      test: 'test',
    },
  });
};

const NotificationService = {
  readNotifications,
  fetchNotifications,
};

export default NotificationService;
