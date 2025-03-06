import { createAction } from '@reduxjs/toolkit';
export const startSocket = createAction('socket/start');
export const getMessage = createAction<unknown>('socket/getMessage');
export const sendMessage = createAction<unknown>('socket/sendMessage');
export const stopSocket = createAction('socket/stop');
