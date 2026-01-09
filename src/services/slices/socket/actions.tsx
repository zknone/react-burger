import { createAction } from '@reduxjs/toolkit';
import { SocketResponse } from '../../../types/types';

export const getAllOrders = createAction<SocketResponse>(
  'socket/wsGetAllOrders'
);
export const getAllPrivateOrders = createAction<SocketResponse>(
  'socket/getAllPrivateOrders'
);
export const sendMessage = createAction<{ type: string; payload: unknown }>(
  'socket/sendMessage'
);

export const socketSuccess = createAction('socket/wsConnectionSuccess');
export const socketClosed = createAction('socket/wsConnectionClosed');

export const startSocket = createAction('socket/start');
export const stopSocket = createAction('socket/stop');
