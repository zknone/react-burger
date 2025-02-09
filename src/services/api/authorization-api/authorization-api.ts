import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, ingredientsApiConfig } from '../../../utils/fetch-data';
import { RegisterAuthorizationResponse } from '../../../types/types';

export const authorizationApi = createApi({
  reducerPath: 'loginApi',
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
    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    }),
    register: builder.mutation<
      RegisterAuthorizationResponse,
      { email: string; password: string; name: string }
    >({
      query: ({ email, password, name }) => ({
        url: '/auth/register',
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),
    }),
    logout: builder.mutation({
      query: (refreshToken: string) => {
        return {
          url: '/auth/logout',
          method: 'POST',
          body: JSON.stringify({ token: refreshToken }),
        };
      },
    }),
    token: builder.mutation({
      query: (refreshToken: string) => {
        return {
          url: '/auth/token',
          method: 'POST',
          body: JSON.stringify({ token: refreshToken }),
        };
      },
    }),
    getUser: builder.query({
      query: () => '/auth/user',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useTokenMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authorizationApi;
