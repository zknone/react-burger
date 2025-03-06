import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../../store';
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from '../slices/socket/reducers';
import { SocketResponse } from '../../types/types';

type Action<T = string, P = unknown> = {
  type: T;
  payload?: P;
};

const createWebSocketMiddleware = (
  wsUrl: string
): Middleware<unknown, RootState, AppDispatch> => {
  let socket: WebSocket | null = null;

  return (store) => {
    return (next) => (action: unknown) => {
      const { type, payload } = action as Action<string, unknown>;

      const storeTyped = store as {
        dispatch: AppDispatch;
        getState: () => RootState;
      };

      console.log('сработало', type);
      if (type === 'socket/start') {
        console.log('сокет сработало');
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          storeTyped.dispatch(wsConnectionSuccess());
        };

        socket.onerror = (event: Event) => {
          storeTyped.dispatch(wsConnectionError(JSON.stringify(event)));
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data: SocketResponse = JSON.parse(event.data);
            storeTyped.dispatch(wsGetMessage(data));
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        socket.onclose = () => {
          storeTyped.dispatch(wsConnectionClosed());
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }

        return next(action);
      }

      return next(action);
    };
  };
};

export default createWebSocketMiddleware;
