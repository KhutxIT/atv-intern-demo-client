import { chatService } from "../../services/ChatService";

export const chatActionType = {
  CHANGE_ROOM: 'CHANGE_ROOM',
  INIT_MESSAGE_ARRAY: 'INIT_MESSAGE_ARRAY',
  NEW_MESSAGE: 'NEW_MESSAGE',
  READ_MESSAGES: 'READ_MESSAGES',
  RECEIVE_READ_MESSAGES: 'RECEIVE_READ_MESSAGES',
  CHANGE_ACTIVITY_STATUS: 'CHANGE_ACTIVITY_STATUS',
  ADD_NEW_ROOM: 'ADD_NEW_ROOM',
  INC_MESSAGE_COUNT: 'INC_MESSAGE_COUNT',
  SEARCH_USERS: 'SEARCH_USERS',

  OPEN_CALLING_MODAL: 'OPEN_CALLING_MODAL',
  CLOSE_CALLING_MODAL: 'CLOSE_CALLING_MODAL',

  NEW_ANSWER: 'NEW_ANSWER',

  OPEN_ANSWERING_MODAL: 'OPEN_ANSWERING_MODAL',
  CLOSE_ANSWERING_MODAL: 'CLOSE_ANSWERING_MODAL',

  TYPING: 'TYPING',
  STOPPED_TYPING: 'STOPPED_TYPING',

  GET_ROOMS_REQUEST: 'GET_ROOMS_REQUEST',
  GET_ROOMS_SUCCESS: 'GET_ROOMS_SUCCESS',

  GET_MESSAGES_INITIAL_REQUEST: 'GET_MESSAGES_INITIAL_REQUEST',
  GET_MESSAGES_REQUEST: 'GET_MESSAGES_REQUEST',
  GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS',

  SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',

  NEW_IMAGE_MESSAGE_REQUEST: 'NEW_IMAGE_MESSAGE_REQUEST',
  NEW_IMAGE_MESSAGE_SUCCESS: 'NEW_IMAGE_MESSAGE_SUCCESS',
};

export const chatActions = {
  typing,
  stoppedTyping,
  changeRoom,
  getChatRooms,
  getMessagesForRoom,
  sendMessage,
  sendImage,
  newMessage,
  readMessages,
  changeActivityStatus,
  imageMessageRequest,
  call,
  answer,
  endCall,
  endAnsweringCall,
  searchUsers,
};

function typing(roomId) {
  return (dispatch) => {
    dispatch({ type: chatActionType.TYPING, roomId });
  };
}

function stoppedTyping(roomId) {
  return (dispatch) => {
    dispatch({ type: chatActionType.STOPPED_TYPING, roomId });
  };
}

function initiateMessageArray(roomId) {
  return { type: chatActionType.INIT_MESSAGE_ARRAY, roomId };
}

function changeRoom(room) {
  return (dispatch) => {
    dispatch({ type: chatActionType.CHANGE_ROOM, room });
  };
}

function readMessages(params) {
  const { messageIds, roomId } = params;
  return (dispatch) => {
    dispatch(read(messageIds, roomId));
    chatService.readMessages(params).then(
      () => {},
      (error) => {
        console.log(error);
      },
    );
  };
  function read(messageIds, roomId) {
    return { type: chatActionType.READ_MESSAGES, messageIds, roomId };
  }
}

function getChatRooms() {
  return (dispatch) => {
    dispatch(request());

    chatService.getChatRooms().then(
      (response) => {
        dispatch(success(response.rooms));

        response.rooms.forEach((room) =>
          dispatch(initiateMessageArray(room._id)),
        );
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function request() {
    return { type: chatActionType.GET_ROOMS_REQUEST };
  }
  function success(rooms) {
    return { type: chatActionType.GET_ROOMS_SUCCESS, rooms };
  }
}

function changeActivityStatus(user) {
  return (dispatch) => {
    dispatch({ type: chatActionType.CHANGE_ACTIVITY_STATUS, user });
  };
}

function getMessagesForRoom(room) {
  return (dispatch) => {
    if (room.initialFetch) {
      dispatch(initialRequest(room._id));
    } else {
      dispatch(request(room._id));
    }
    chatService.getMessagesForRoom(room).then(
      (response) => {
        dispatch(
          success({ messages: response.messages.reverse(), roomId: room._id }),
        );
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function request(roomId) {
    return { type: chatActionType.GET_MESSAGES_REQUEST, roomId };
  }
  function initialRequest(roomId) {
    return { type: chatActionType.GET_MESSAGES_INITIAL_REQUEST, roomId };
  }
  function success(data) {
    return { type: chatActionType.GET_MESSAGES_SUCCESS, data };
  }
}

function sendMessage(message) {
  return (dispatch) => {
    dispatch(request({ ...message, sent: false }));

    chatService.sendMessage(message).then(
      (response) => {
        dispatch(success(response.message));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function request(message) {
    return { type: chatActionType.SEND_MESSAGE_REQUEST, message };
  }
  function success(message) {
    return { type: chatActionType.SEND_MESSAGE_SUCCESS, message };
  }
}

function sendImage(data, message) {
  return (dispatch) => {
    dispatch(request({ ...message, sent: false }));

    chatService.sendImage(data).then(
      (response) => {
        dispatch(success(response.message));
      },
      (error) => {
        console.log(error);
      },
    );
  };
  function request(message) {
    return { type: chatActionType.SEND_MESSAGE_REQUEST, message };
  }
  function success(message) {
    return { type: chatActionType.SEND_MESSAGE_SUCCESS, message };
  }
}

function newMessage(message) {
  return (dispatch) => {
    dispatch(success(message));
    dispatch({ type: chatActionType.INC_MESSAGE_COUNT });
  };
  function success(message) {
    return { type: chatActionType.NEW_MESSAGE, message };
  }
}

function imageMessageRequest(message) {
  return (dispatch) => {
    dispatch(success(message));
  };
  function success(message) {
    return { type: chatActionType.NEW_IMAGE_MESSAGE_REQUEST, message };
  }
}

function call(data) {
  return (dispatch) => {
    dispatch({ type: chatActionType.OPEN_CALLING_MODAL });

    chatService.call(data).then(
      () => {},
      (error) => {
        console.log(error);
      },
    );
  };
}

function answer(data) {
  return (dispatch) => {
    chatService.answer(data).then(
      () => {},
      (error) => {
        console.log(error);
      },
    );
  };
}

function endCall() {
  return (dispatch) => {
    dispatch({ type: chatActionType.CLOSE_CALLING_MODAL });
  };
}

function endAnsweringCall() {
  return (dispatch) => {
    dispatch({ type: chatActionType.CLOSE_ANSWERING_MODAL });
  };
}

function searchUsers(rooms) {
  return (dispatch) => {
    dispatch({ type: chatActionType.SEARCH_USERS, rooms });
  };
}
