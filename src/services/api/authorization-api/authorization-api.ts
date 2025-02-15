import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  LoginRequest,
  LoginResponse,
  RegisterAuthorizationResponse,
  TokenResponse,
} from '../../../types/types';

export const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const ingredientsApiConfig = {
  baseUrl: BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
};

const fetchWithRefreshQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = localStorage.getItem('accessToken');
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return result;
    }

    const refreshResult = await api.dispatch(
      authorizationApi.endpoints.token.initiate(refreshToken)
    );

    if ('data' in refreshResult) {
      const newAccessToken = refreshResult.data?.accessToken;
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  return result;
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
        body: { email, password, name },
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
          body: { email, password, name },
        };
      },
    }),
    logout: builder.mutation({
      query: (refreshToken: string) => {
        return {
          url: '/auth/logout',
          method: 'POST',
          body: { token: refreshToken },
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
