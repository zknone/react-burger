import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ingredientsApiConfig } from '../../utils/fetch-data';

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
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
