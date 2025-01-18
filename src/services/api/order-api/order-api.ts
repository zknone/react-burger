import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, ingredientsApiConfig } from '../../../utils/fetch-data';

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
      query: (order: string[]) => ({
        url: '/orders',
        method: 'POST',
        body: JSON.stringify({ ingredients: order }),
      }),
    }),
  }),
});

export const { useSendOrderMutation } = orderApi;
