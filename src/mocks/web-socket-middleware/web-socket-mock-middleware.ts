import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../../store';
import {
  wsConnectionSuccess,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
  wsConnectionClosed,
} from '../../services/slices/socket/reducers';
import { mockOrders } from '../data';

const createMockWebSocketMiddleware =
  (): Middleware<unknown, RootState, AppDispatch> => (store) => {
    let interval: NodeJS.Timeout | null = null;

    return (next) => (action: { type: string; payload?: unknown }) => {
      if (action.type === 'socket/start') {
        store.dispatch(wsConnectionSuccess());

        interval = setInterval(() => {
          const socketResponse = {
            orders: mockOrders,
            success: true,
            total: mockOrders.length,
            totalToday: mockOrders.length,
          };
          store.dispatch(wsGetAllOrders(socketResponse));
          store.dispatch(wsGetAllPrivateOrders(socketResponse));
        }, 5000);
      }

      if (action.type === 'socket/stop') {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        store.dispatch(wsConnectionClosed());
      }

      return next(action);
    };
  };

export default createMockWebSocketMiddleware;
