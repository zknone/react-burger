import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ingredientsApiConfig } from '../../../utils/fetch-data';
import { IngredientType } from '../../../types/types';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
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
    getIngredients: builder.query({
      query: () => '/ingredients',
    }),
    //вынести отдельно
    // const [sendOrder] = useSendOrderMutation();
    //sendOrder(value);
    //это как использовать
    sendOrder: builder.mutation({
      query: (ingredients: IngredientType[]) => ({
        url: '/constructor',
        method: 'POST',
        body: JSON.stringify({ content: ingredients }),
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useSendOrderMutation } = ingredientsApi;
