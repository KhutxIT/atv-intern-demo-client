import { appConfig } from "../infrastructure/appManager";

export const chatService = {
  getChatRooms,
  getMessagesForRoom,
  sendMessage,
  sendImage,
  readMessages,
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getChatRooms() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    }
  };

  return fetch(`${appConfig.REACT_APP_SOCKET_END_POINT}/api/chat/getChatRooms/`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function readMessages(params) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify({
      ...params
    })
  };

  return fetch(`${appConfig.REACT_APP_SOCKET_END_POINT}/api/chat/readMessages/`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function getMessagesForRoom(room) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify({
      ...room
    })
  };

  return fetch(`${appConfig.REACT_APP_SOCKET_END_POINT}/api/chat/getMessagesForRoom/`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function sendMessage(params) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify({
      ...params
    })
  };

  return fetch(`${appConfig.REACT_APP_SOCKET_END_POINT}/api/chat/sendMessage/`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function sendImage(data) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem('token')
    },
    body: data
  };

  return fetch(`${appConfig.REACT_APP_SOCKET_END_POINT}/api/chat/sendImage/`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
