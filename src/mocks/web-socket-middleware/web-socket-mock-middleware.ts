import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../../store';
import {
  wsConnectionSuccess,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
  wsConnectionClosed,
} from '../../services/slices/socket/reducers';
import {
  getMockOrders,
  getMockUserOrders,
  subscribeMockOrders,
} from '../mock-orders-store';

const createMockWebSocketMiddleware =
  (): Middleware<unknown, RootState, AppDispatch> => (store) => {
    const EMIT_INTERVAL_MS = 5000;
    let interval: NodeJS.Timeout | null = null;
    let unsubscribe: (() => void) | null = null;

    const dispatchSocketResponse = () => {
      const allOrders = getMockOrders();
      const userOrders = getMockUserOrders();

      const buildSocketResponse = (orders: ReturnType<typeof getMockOrders>) => {
        const totalDone = orders.filter((order) => order.status === 'done').length;
        return {
          orders,
          success: true,
          total: orders.length,
          totalToday: totalDone,
        };
      };

      store.dispatch(wsGetAllOrders(buildSocketResponse(allOrders)));
      store.dispatch(wsGetAllPrivateOrders(buildSocketResponse(userOrders)));
    };

    const emitOrders = () => {
      dispatchSocketResponse();
    };

    return (next) => (action: unknown) => {
      const { type } = action as { type?: string; payload?: unknown };

      if (type === 'socket/start') {
        store.dispatch(wsConnectionSuccess());

        emitOrders();
        unsubscribe = subscribeMockOrders(dispatchSocketResponse);

        interval = setInterval(emitOrders, EMIT_INTERVAL_MS);
      }

      if (type === 'socket/stop') {
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
