import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';

const baseQuery = getBaseQuery(fetchBaseQuery({ baseUrl: BASE_API_URL }));

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  endpoints: (builder) => ({
    sendOrder: builder.mutation({
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
    }),
    getOrder: builder.query({
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
    }),
  }),
});

export const { useSendOrderMutation, useGetOrderQuery } = orderApi;
