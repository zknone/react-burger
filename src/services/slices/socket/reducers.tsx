import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketResponse } from '../../../types/types';

type Socket = {
  data: SocketResponse | null;
  privateData: SocketResponse | null;
  isSocketOpen: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: Socket = {
  isSocketOpen: false,
  isLoading: false,
  data: null,
  privateData: null,
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
    wsGetAllOrders: (state, action: PayloadAction<SocketResponse>) => {
      state.isLoading = false;

      console.log(action);
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
        state.isLoading = false;
      }
    },
    wsGetAllPrivateOrders: (state, action: PayloadAction<SocketResponse>) => {
      state.isLoading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.privateData = action.payload;
        state.isLoading = false;
      }
    },
  },
});

export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
} = socketSlice.actions;
export default socketSlice.reducer;
