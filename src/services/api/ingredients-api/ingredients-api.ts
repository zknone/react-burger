import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_API_URL,
  ingredientsApiConfig,
} from '../authorization-api/authorization-api';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
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
    getIngredients: builder.query({
      query: () => '/ingredients',
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
