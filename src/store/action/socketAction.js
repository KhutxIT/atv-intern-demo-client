import { createSocketConnection } from '../../infrastructure/socketManager';
import { chatActions, chatActionType } from './chatAction';
import { notificationActions } from './notificationAction';
import {
  receiveNewFriendRequest,
  receiveRemoveFriendRequest,
} from './userAction';

export const socketActionType = {
  LISTENING_EVENT: 'listening_EVENT',
};

export const listeningEvent = () => (dispatch) => {
  createSocketConnection().then((socket) => {
    dispatch(receiveEvent(socket));
    socket.on('@newFriendRequest', (socketId, data) => {
      // thêm thông báo có người gửi kết bạn
      dispatch(receiveNewFriendRequest());
    });

    socket.on('@removeFriendRequest', (socketId) => {
      dispatch(receiveRemoveFriendRequest());
    });

    socket.on('@newNotification', (data) => {
      dispatch(notificationActions.addNotification(data));
    });

    socket.on('@newMessage', (data) => {
      dispatch(chatActions.newMessage(data));
    });

    socket.on('@readMessages', (data) => {
      dispatch({ type: chatActionType.RECEIVE_READ_MESSAGES, data });
    });

    // socket.on("newUser", data => {
    //   dispatch({ type: userConstants.NEW_USER, user: data });
    // });

    // socket.on("imageMessageRequest", data => {
    //   function request(message) {
    //     return { type: chatConstants.SEND_MESSAGE_REQUEST, message };
    //   }
    //   dispatch(request({ ...data, sent: false }));
    // });

    // socket.on("imageMessage", data => {
    //   function success(message) {
    //     return { type: chatConstants.SEND_MESSAGE_SUCCESS, message };
    //   }
    //   dispatch({ type: chatConstants.INC_MESSAGE_COUNT });
    //   dispatch(success({ ...data }));
    // });

    socket.on('@newRoom', (data) => {
      dispatch({ type: chatActionType.INIT_MESSAGE_ARRAY, roomId: data._id });
      dispatch({ type: chatActionType.ADD_NEW_ROOM, room: data });
    });

    socket.on('@typing', (data) => {
      dispatch(chatActions.typing(data.roomId));
    });

    socket.on('@stoppedTyping', (data) => {
      dispatch(chatActions.stoppedTyping(data.roomId));
    });

    socket.on('@activityStatusUpdate', (data) => {
      dispatch(chatActions.changeActivityStatus(data));
    });
    // socket.on("newCall", data => {
    //   dispatch({ type: chatConstants.OPEN_ANSWERING_MODAL, data });
    // });
  });
};

export const receiveEvent = (socket) => ({
  type: socketActionType.LISTENING_EVENT,
  payload: socket,
});
