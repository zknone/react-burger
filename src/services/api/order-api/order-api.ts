import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_API_URL,
  ingredientsApiConfig,
} from '../authorization-api/authorization-api';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      for (const [key, value] of Object.entries(ingredientsApiConfig.headers)) {
        headers.set(key, value);
      }

      return headers;
    },
  }),
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
      query: (id: string) => {
        const token = localStorage.getItem('accessToken');

        return {
          url: `/orders/${id}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        };
      },
    }),
  }),
});

export const { useSendOrderMutation, useGetOrderQuery } = orderApi;
