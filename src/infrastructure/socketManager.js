import io from 'socket.io-client';
import UserService from '../services/UserService';
import { appConfig } from './appManager';

export function createSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = io(appConfig.REACT_APP_SOCKET_END_POINT, {
      extraHeaders: { Authorization: `Bearer ${UserService.getToken()}` },
      timeout: 10000,
      requestTimeout: 10000,
    });
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

// export const reconnectSocket = () => {
//   if (s?.connected) {
//     s.disconnect();
//   }

//   s = io(appConfig.REACT_APP_SOCKET_END_POINT, {
//     extraHeaders: { Authorization: `Bearer ${UserService.getToken()}` },
//   });

//   return (s = getSocket());
// };

// export const socketEmitHandler = (type, data) =>
//   new Promise((resolve, reject) => {
//     getSocket().emit(type, data, (result) => {
//       const { error } = result || {};
//       if (error) reject(error);

//       resolve(result);
//     });
//   });

// export const socket = getSocket();
