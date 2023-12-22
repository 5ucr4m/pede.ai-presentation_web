/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

// Tipos de ações
enum SocketActionTypes {
  Connect = 'SOCKET_CONNECT',
  Disconnect = 'SOCKET_DISCONNECT',
  SendMessage = 'SEND_MESSAGE'
}

interface SocketConnectAction {
  type: SocketActionTypes.Connect;
  payload: { endpoint: string };
}

interface SendMessageAction {
  type: SocketActionTypes.SendMessage;
  payload: { message: string };
}

interface SocketDisconnectAction {
  type: SocketActionTypes.Disconnect;
}

type SocketActions = SocketConnectAction | SendMessageAction | SocketDisconnectAction;

const socketMiddleware: Middleware = storeApi => {
  let socket: Socket | null = null;

  const onSocketEvent = (event: string, emitActionType: string) => {
    socket?.on(event, (data) => {
      storeApi.dispatch({ type: emitActionType, payload: data });
    });
  };

  return next => action => {
    if (!isSocketAction(action)) {
      return next(action);
    }

    switch (action.type) {
      case SocketActionTypes.Connect:
        socket = io(action.payload.endpoint);
        onSocketEvent('user-connected', 'users/userConnected');
        onSocketEvent('message', SocketActionTypes.SendMessage);
        break;

      case SocketActionTypes.SendMessage:
        socket?.emit('message', action.payload.message);
        break;

      case SocketActionTypes.Disconnect:
        socket?.disconnect();
        socket = null;
        break;
    }
  };
};

function isSocketAction(action: any): action is SocketActions {
  return Object.values(SocketActionTypes).includes(action.type);
}

export default socketMiddleware;
