import {
  notificationActionType
} from '../action/notificationAction';
import { userActionType } from '../action/userAction';

const initState = {
  isOpen: false,
  notifications: [],
  allNotificationsCount: 0,
};

export default function notification(state = initState, action) {
  switch (action.type) {
    case notificationActionType.FETCH_NOTIFICATIONS_SUCCESS:
      if (action.initialFetch) {
        return {
          ...state,
          notifications: action.notifications,
          allNotificationsCount: action.total.count,
        };
      }
      return {
        ...state,
        notifications: [...state.notifications, ...action.notifications],
      };

    case notificationActionType.CLOSE_NOTIFICATION_POPUP:
      return {
        ...state,
        isOpen: false,
      };
    case notificationActionType.TOGGLE_NOTIFICATION_POPUP:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case notificationActionType.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.data.notification, ...state.notifications],
        allNotificationsCount: state.allNotificationsCount + 1,
      };
    case notificationActionType.READ_NOTIFICATIOS:
      return {
        ...state,
        notifications: state.notifications.map((e) => {
          return {
            ...e,
            read: true,
          };
        }),
      };
    case userActionType.GETUSER_SUCCESS:
      return {
        ...state,
        allNotificationsCount: action.user.allNotifications,
      };
    default:
      return state;
  }
}
