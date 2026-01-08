import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';
import validateDataWithZod from '../../../utils/validation';
import {
  fetchedIngredientsModel,
  FetchedIngredients,
} from '../../../types/types';

const baseQuery = getBaseQuery(fetchBaseQuery({ baseUrl: BASE_API_URL }));

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery,
  endpoints: (builder) => ({
    getIngredients: builder.query<FetchedIngredients, void>({
      query: () => '/ingredients',
      transformResponse: (res: FetchedIngredients) => {
        const parsed = validateDataWithZod<FetchedIngredients>(
          fetchedIngredientsModel,
          res,
          'Invalid ingredients data received from server'
        );
        return parsed ?? { success: false, data: [] };
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
