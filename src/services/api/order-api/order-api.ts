import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';
import validateDataWithZod from '../../../utils/validation';
import {
  OrderResponse,
  orderResponseModel,
  CreateOrderResponse,
  createOrderResponseModel,
} from '../../../types/types';

const baseQuery = getBaseQuery(fetchBaseQuery({ baseUrl: BASE_API_URL }));

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
      transformResponse: (res: unknown) => {
        const parsed = validateDataWithZod<CreateOrderResponse>(
          createOrderResponseModel,
          res,
          'Invalid order creation response received from server'
        );
        return (
          parsed ?? {
            success: false,
            name: '',
            order: { number: 0 },
          }
        );
      },
    }),
    getOrder: builder.query<OrderResponse, number | undefined>({
      query: (number?: number) => {
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
      },
      transformResponse: (res: unknown) => {
        const parsed = validateDataWithZod<OrderResponse>(
          orderResponseModel,
          res,
          'Invalid order response received from server'
        );
        return parsed ?? { success: false, orders: [] };
      },
    }),
  }),
});

export const { useSendOrderMutation, useGetOrderQuery } = orderApi;
