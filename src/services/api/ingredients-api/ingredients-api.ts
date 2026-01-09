import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';
import {
  fetchedIngredientsModel,
  FetchedIngredients,
} from '../../../types/types';
import { transformCustomResponse } from '../../../utils/api';

const baseQuery = getBaseQuery(fetchBaseQuery({ baseUrl: BASE_API_URL }));

export const emptyFetchedIngredients: FetchedIngredients = {
  success: false,
  data: [],
};

export const transformIngredientsResponse = (res: FetchedIngredients) =>
  transformCustomResponse(
    res,
    fetchedIngredientsModel,
    'Invalid ingredients data received from server',
    emptyFetchedIngredients,
    { throwOnError: true }
  );

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery,
  endpoints: (builder) => ({
    getIngredients: builder.query<FetchedIngredients, void>({
      query: () => '/ingredients',
      transformResponse: transformIngredientsResponse,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
