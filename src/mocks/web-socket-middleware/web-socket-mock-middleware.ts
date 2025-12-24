import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../../store';
import {
  wsConnectionSuccess,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
  wsConnectionClosed,
} from '../../services/slices/socket/reducers';
import { getMockOrders, subscribeMockOrders } from '../mock-orders-store';

const createMockWebSocketMiddleware =
  (): Middleware<unknown, RootState, AppDispatch> => (store) => {
    let interval: NodeJS.Timeout | null = null;
    let unsubscribe: (() => void) | null = null;

    const emitOrders = () => {
      const orders = getMockOrders();
      const totalDone = orders.filter(
        (order) => order.status === 'done'
      ).length;
      const socketResponse = {
        orders,
        success: true,
        total: orders.length,
        totalToday: totalDone,
      };
      store.dispatch(wsGetAllOrders(socketResponse));
      store.dispatch(wsGetAllPrivateOrders(socketResponse));
    };

    return (next) => (action: { type: string; payload?: unknown }) => {
      if (action.type === 'socket/start') {
        store.dispatch(wsConnectionSuccess());

        emitOrders();
        unsubscribe = subscribeMockOrders(emitOrders);

        interval = setInterval(emitOrders, 5000);
      }

      if (action.type === 'socket/stop') {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        if (unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }
        store.dispatch(wsConnectionClosed());
      }

      return next(action);
    };
  };

export default createMockWebSocketMiddleware;
