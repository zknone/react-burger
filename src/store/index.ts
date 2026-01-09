import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { ingredientsApi } from '../services/api/ingredients-api/ingredients-api';
import burgerConstructorReducer from '../services/slices/constructor/reducers';
import socketReducer from '../services/slices/socket/reducers';
import profileReducer from '../services/slices/profile/reducers';
import { orderApi } from '../services/api/order-api/order-api';
import { authorizationApi } from '../services/api/authorization-api/authorisation-api';
import { useDispatch } from 'react-redux';
import createWebSocketMiddleware from '../services/middleware/web-socket-middleware';
import createMockWebSocketMiddleware from '../mocks/web-socket-middleware/web-socket-mock-middleware';

const WS_URL = 'wss://norma.nomoreparties.space/orders';
const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

const wsMiddleware: Middleware =
  useMocks
    ? createMockWebSocketMiddleware()
    : createWebSocketMiddleware(WS_URL);

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  burgerConstructor: burgerConstructorReducer,
  socket: socketReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      orderApi.middleware,
      authorizationApi.middleware,
      wsMiddleware
    );
  },
  devTools: process.env.NODE_ENV !== 'production',
});

declare global {
  interface Window {
    store: typeof store;
  }
}

if (window.Cypress) {
  window.store = store;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootReducer>;
