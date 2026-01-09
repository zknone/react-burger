import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';
import {
  OrderResponse,
  orderResponseModel,
  CreateOrderResponse,
  createOrderResponseModel,
} from '../../../types/types';
import { transformCustomResponse } from '../../../utils/api';

const baseQuery = getBaseQuery(fetchBaseQuery({ baseUrl: BASE_API_URL }));

export const emptyCreateOrderResponse: CreateOrderResponse = {
  success: false,
  name: '',
  order: { number: 0 },
};

export const emptyOrderResponse: OrderResponse = {
  success: false,
  orders: [],
};

export const transformCreateOrderResponse = (res: CreateOrderResponse) =>
  transformCustomResponse(
    res,
    createOrderResponseModel,
    'Invalid order creation response received from server',
    emptyCreateOrderResponse
  );

export const transformGetOrderResponse = (res: OrderResponse) =>
  transformCustomResponse(
    res,
    orderResponseModel,
    'Invalid order response received from server',
    emptyOrderResponse
  );

export const getOrderQuery = (number?: number) => {
  const token = localStorage.getItem('accessToken') || '';
  if (number === undefined) {
    throw new Error('There is no order number');
  }
  return {
    url: `/orders/${number}`,
    method: 'GET',
    headers: token
      ? { 'Content-Type': 'application/json', Authorization: token }
      : { 'Content-Type': 'application/json' },
  };
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  endpoints: (builder) => ({
    sendOrder: builder.mutation<CreateOrderResponse, string[]>({
      query: (order: string[]) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: '/orders',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ ingredients: order }),
        };
      },
      transformResponse: transformCreateOrderResponse,
    }),
    getOrder: builder.query<OrderResponse, number | undefined>({
      query: getOrderQuery,
      transformResponse: transformGetOrderResponse,
    }),
  }),
});

export const { useSendOrderMutation, useGetOrderQuery } = orderApi;
