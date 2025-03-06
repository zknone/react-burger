import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketResponse } from '../../../types/types';

type Socket = {
  data: SocketResponse;
  isSocketOpen: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: Socket = {
  isSocketOpen: false,
  isLoading: false,
  data: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
  },
  error: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.isSocketOpen = true;
      state.error = null;
      state.isLoading = true;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    wsConnectionClosed: (state) => {
      state.isSocketOpen = false;
      state.isLoading = false;
    },
    wsGetMessage: (state, action: PayloadAction<SocketResponse>) => {
      state.isLoading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    },
  },
});

export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
} = socketSlice.actions;
export default socketSlice.reducer;
