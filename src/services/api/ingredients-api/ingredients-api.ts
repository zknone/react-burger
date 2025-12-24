import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';

const baseQuery = getBaseQuery(fetchBaseQuery({ baseUrl: BASE_API_URL }));

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery,
  endpoints: (builder) => ({
    getIngredients: builder.query({ query: () => '/ingredients' }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
