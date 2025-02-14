import { createApi } from '@reduxjs/toolkit/query/react';
import {
  LoginRequest,
  LoginResponse,
  RegisterAuthorizationResponse,
  TokenResponse,
} from '../../../types/types';
import fetchWithRefreshQuery from './fetch-with-base-query';

export const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const ingredientsApiConfig = {
  baseUrl: BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
};

export const authorizationApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchWithRefreshQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
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
    changeProfile: builder.mutation<
      RegisterAuthorizationResponse,
      { email: string; password: string; name: string }
    >({
      query: ({ email, password, name }) => {
        const token = localStorage.getItem('accessToken');

        return {
          url: '/auth/user',
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ email, password, name }),
        };
      },
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
    token: builder.mutation<TokenResponse, string>({
      query: (refreshToken) => ({
        url: '/auth/token',
        method: 'POST',
        body: { token: refreshToken },
      }),
    }),
    getUser: builder.query({
      query: () => {
        const token = localStorage.getItem('accessToken');
        return {
          url: '/auth/user',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }: { password: string; token: string }) => {
        return {
          url: 'password-reset/reset',
          method: 'POST',
          body: {
            password,
            token,
          },
        };
      },
    }),
    restorePassword: builder.mutation({
      query: (email: string) => {
        return {
          url: 'password-reset',
          method: 'POST',
          body: {
            email,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
  useResetPasswordMutation,
  useRestorePasswordMutation,
  useChangeProfileMutation,
} = authorizationApi;
