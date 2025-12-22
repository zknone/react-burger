import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, SocketResponse } from '../../../types/types';

type Socket = {
  data: SocketResponse | null;
  privateData: SocketResponse | null;
  isSocketOpen: boolean;
  isLoading: boolean;
  error: string | null;
};

export const initialState: Socket = {
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
    addOrder: (state, action: PayloadAction<Order>) => {
      const currentOrders = state.data ? state.data.orders : [];
      const newOrders = [action.payload, ...currentOrders];

      const currentData = state.data || {
        success: true,
        total: 0,
        totalToday: 0,
        orders: [],
      };

      const newData = {
        ...currentData,
        orders: newOrders,
        total: currentData.total + 1,
        totalToday: currentData.totalToday + 1,
      };

      return {
        ...state,
        data: newData,
      };
    },
  },
});

export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
  addOrder,
} = socketSlice.actions;
export default socketSlice.reducer;

export { socketSlice };
