import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../../store';
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
} from '../slices/socket/reducers';
import { SocketResponse, socketResponseModel } from '../../types/types';
import { checkUserAuth } from '../auth/check-user-auth';
import validateDataWithZod from '../../utils/validation';
import { ERROR_MESSAGES } from '../../utils/error-messages';
import { logError } from '../../utils/logger';

type Action<T = string, P = unknown> = {
  type: T;
  payload?: P;
};

const createWebSocketMiddleware = (
  wsUrl: string
): Middleware<unknown, RootState, AppDispatch> => {
  let privateSocket: WebSocket | null = null;
  let allOrdersSocket: WebSocket | null = null;

  return (store) => (next) => (action: unknown) => {
    const { type, payload } = action as Action<string, unknown>;

    const storeTyped = store as {
      dispatch: AppDispatch;
      getState: () => RootState;
    };

    if (type === 'socket/start') {
      if (!allOrdersSocket) {
        const currentSocket = new WebSocket(`${wsUrl}/all`);
        allOrdersSocket = currentSocket;

        allOrdersSocket.onopen = () => {
          storeTyped.dispatch(wsConnectionSuccess());
        };

        allOrdersSocket.onerror = (event: Event) => {
          storeTyped.dispatch(wsConnectionError(ERROR_MESSAGES.websocketConnection));
          logError('socket/allOrders:error', event);
        };

        allOrdersSocket.onmessage = (event: MessageEvent) => {
          try {
            const parsed = validateDataWithZod<SocketResponse>(
              socketResponseModel,
              JSON.parse(event.data),
              'Invalid socket data',
              { throwOnError: false }
            );
            if (parsed) {
              storeTyped.dispatch(wsGetAllOrders(parsed));
            } else {
              storeTyped.dispatch(wsConnectionError(ERROR_MESSAGES.websocketParse));
            }
          } catch (error) {
            logError('socket/allOrders:parse', error);
            storeTyped.dispatch(wsConnectionError(ERROR_MESSAGES.websocketParse));
          }
        };

        allOrdersSocket.onclose = () => {
          if (allOrdersSocket === currentSocket) {
            storeTyped.dispatch(wsConnectionClosed());
            allOrdersSocket = null;
          }
        };
      }

      if (!privateSocket) {
        const parseToken = () => {
          return localStorage.getItem('accessToken')?.slice(6).trim() || null;
        };

        let accessToken = localStorage.getItem('accessToken');

        const initializePrivateSocket = (token: string | null) => {
          if (!token) return;

          privateSocket = new WebSocket(`${wsUrl}?token=${parseToken()}`);

          privateSocket.onopen = () => {
            storeTyped.dispatch(wsConnectionSuccess());
          };

          privateSocket.onerror = (event: Event) => {
            storeTyped.dispatch(wsConnectionError(ERROR_MESSAGES.websocketConnection));
            logError('socket/private:error', event);
          };

          privateSocket.onmessage = (event: MessageEvent) => {
            try {
              const parsed = validateDataWithZod<SocketResponse>(
                socketResponseModel,
                JSON.parse(event.data),
                'Invalid private socket data',
                { throwOnError: false }
              );
              if (parsed) {
                storeTyped.dispatch(wsGetAllPrivateOrders(parsed));
              } else {
                storeTyped.dispatch(wsConnectionError(ERROR_MESSAGES.websocketParse));
              }
            } catch (error) {
              logError('socket/private:parse', error);
              storeTyped.dispatch(wsConnectionError(ERROR_MESSAGES.websocketParse));
            }
          };

          privateSocket.onclose = () => {
            storeTyped.dispatch(wsConnectionClosed());
            privateSocket = null;
          };
        };

        if (!accessToken) {
          storeTyped
            .dispatch(checkUserAuth())
            .then(() => {
              accessToken = localStorage.getItem('accessToken');
              initializePrivateSocket(accessToken);
            })
            .catch((error) => {
              logError('socket/private:token-refresh', error);
            });
        } else {
          initializePrivateSocket(accessToken);
        }
      }
    }

    if (type === 'socket/stop') {
      if (allOrdersSocket) {
        allOrdersSocket.close();
        allOrdersSocket = null;
      }
      if (privateSocket) {
        privateSocket.close();
        privateSocket = null;
      }
    }

    if (type === 'WS_SEND_MESSAGE') {
      const message = payload;
      if (allOrdersSocket?.readyState === WebSocket.OPEN) {
        allOrdersSocket.send(JSON.stringify(message));
      }
      if (privateSocket?.readyState === WebSocket.OPEN) {
        privateSocket.send(JSON.stringify(message));
      }
    }

    return next(action);
  };
};

export default createWebSocketMiddleware;
