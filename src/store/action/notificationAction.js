import NotificationService from '../../services/NotificationService';

export const notificationActionType = {
  TOGGLE_NOTIFICATION_POPUP: 'TOGGLE_NOTIFICATION_POPUP',
  CLOSE_NOTIFICATION_POPUP: 'CLOSE_NOTIFICATION_POPUP',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  READ_NOTIFICATIOS: 'READ_NOTIFICATIOS',
  FETCH_NOTIFICATIONS_REQUEST: 'FETCH_NOTIFICATIONS_REQUEST',
  FETCH_NOTIFICATIONS_SUCCESS: 'FETCH_NOTIFICATIONS_SUCCESS',
};

export const notificationActions = {
  toggleNotificationPopup,
  closeNotificationPopup,
  addNotification,
  fetchNotifications,
};

function readNotifications(notificationIds) {
  NotificationService.readNotifications(notificationIds)
    .then((res) => {})
    .catch(({ response }) => console.log(response.data));
}

function fetchNotifications(queryOptions, notificationIds) {
  return (dispatch) => {
    NotificationService.fetchNotifications(queryOptions)
      .then((response) => {
        if (queryOptions.initialFetch) {
          const { notifications, total } = response.data?.data[0];
          dispatch(success(notifications, total[0], queryOptions.initialFetch));
          // read notifications
          const ids = notifications
            .filter((e) => !e.read)
            .map((e) => e._id)
            .concat(notificationIds);
          const uniqueIds = ids
            .filter((item, index) => ids.indexOf(item) === index)
            .filter((item) => item !== undefined);
          readNotifications(uniqueIds);

          if (uniqueIds[0] !== undefined) {
            dispatch({
              type: notificationActionType.READ_NOTIFICATIOS,
              readCount: uniqueIds.length,
            });
          }
        } else {
          // dispatch(success(response));
          // read notifications
          const ids = response.data?.data
            .filter((e) => !e.read)
            .map((e) => e._id)
            .concat(notificationIds);
          const uniqueIds = ids
            .filter((item, index) => ids.indexOf(item) === index)
            .filter((item) => item !== undefined);
          readNotifications(uniqueIds);

          if (uniqueIds[0] !== undefined) {
            dispatch({
              type: notificationActionType.READ_NOTIFICATIOS,
              readCount: uniqueIds.length,
            });
          }
        }
      })
      .catch(({ response }) => console.log(response?.data));
  };

  function success(notifications, total, initialFetch) {
    return {
      type: notificationActionType.FETCH_NOTIFICATIONS_SUCCESS,
      notifications,
      total,
      initialFetch,
    };
  }
}

function toggleNotificationPopup() {
  return (dispatch) => {
    dispatch({
      type: notificationActionType.TOGGLE_NOTIFICATION_POPUP,
    });
  };
}

function closeNotificationPopup() {
  return (dispatch) => {
    dispatch({ type: notificationActionType.CLOSE_NOTIFICATION_POPUP });
  };
}

function addNotification(data) {
  return (dispatch) => {
    dispatch({ type: notificationActionType.ADD_NOTIFICATION, data });
  };
}
