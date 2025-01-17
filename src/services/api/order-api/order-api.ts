import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ingredientsApiConfig } from '../../../utils/fetch-data';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ingredientsApiConfig.baseUrl,
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
        url: '/constructor',
        method: 'POST',
        body: JSON.stringify({ content: order }),
      }),
    }),
  }),
});

export const { useSendOrderMutation } = orderApi;
