import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  forgotResetPasswordLogoutResponseModel,
  ForgotResetPasswordLogoutResponseType,
  LoginRequest,
  LoginResponse,
  loginResponseModel,
  ProfileResponse,
  profileResponseModel,
  RegisterAuthorizationResponse,
  registerAuthorizationResponseModel,
  TokenResponse,
  tokenResponseModel,
} from '../../../types/types';
import { BASE_API_URL } from '../../../consts';
import { getBaseQuery } from '../get-base-query';
import validateDataWithZod from '../../../utils/validation';

export const ingredientsApiConfig = {
  baseUrl: BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
};

const fetchWithRefreshQuery: BaseQueryFn<
  string | FetchArgs,
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

const baseQuery = getBaseQuery(fetchWithRefreshQuery);

export const authorizationApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (res: LoginResponse) => {
        const parsed = validateDataWithZod<LoginResponse>(
          loginResponseModel,
          res,
          'Invalid login data received from server'
        );
        return (
          parsed ?? {
            success: false,
            accessToken: '',
            refreshToken: '',
            user: { email: '', name: '' },
          }
        );
      },
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
      transformResponse: (res: RegisterAuthorizationResponse) => {
        const parsed = validateDataWithZod<RegisterAuthorizationResponse>(
          registerAuthorizationResponseModel,
          res,
          'Invalid registration data received from server'
        );
        return (
          parsed ?? {
            success: false,
            accessToken: '',
            refreshToken: '',
            user: { email: '', name: '' },
          }
        );
      },
    }),
    changeProfile: builder.mutation<
      ProfileResponse,
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
      transformResponse: (res: ProfileResponse) => {
        const parsed = validateDataWithZod<ProfileResponse>(
          profileResponseModel,
          res,
          'Invalid change profile data received from server'
        );
        return (
          parsed ?? {
            success: false,
            user: { email: '', name: '' },
          }
        );
      },
    }),
    logout: builder.mutation<
      ForgotResetPasswordLogoutResponseType,
      string
    >({
      query: (refreshToken: string) => {
        return {
          url: '/auth/logout',
          method: 'POST',
          body: { token: refreshToken },
        };
      },
      transformResponse: (res: ForgotResetPasswordLogoutResponseType) => {
        const parsed =
          validateDataWithZod<ForgotResetPasswordLogoutResponseType>(
            forgotResetPasswordLogoutResponseModel,
            res,
            'Invalid logout data received from server'
          );
        return parsed ?? { success: false, message: '' };
      },
    }),
    token: builder.mutation<TokenResponse, string>({
      query: (refreshToken) => ({
        url: '/auth/token',
        method: 'POST',
        body: { token: refreshToken },
      }),
      transformResponse: (res: TokenResponse) => {
        const parsed = validateDataWithZod<TokenResponse>(
          tokenResponseModel,
          res,
          'Invalid token data received from server'
        );
        return parsed ?? { success: false, accessToken: '', refreshToken: '' };
      },
    }),
    getUser: builder.query<ProfileResponse, void>({
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
      transformResponse: (res: ProfileResponse) => {
        const parsed = validateDataWithZod<ProfileResponse>(
          profileResponseModel,
          res,
          'Invalid profile data received from server'
        );
        return (
          parsed ?? {
            success: false,
            user: { email: '', name: '' },
          }
        );
      },
    }),
    resetPassword: builder.mutation<
      ForgotResetPasswordLogoutResponseType,
      { password: string; token: string }
    >({
      query: ({ password, token }: { password: string; token: string }) => {
        return {
          url: 'password-reset/reset',
          method: 'POST',
          body: { password, token },
        };
      },
      transformResponse: (res: unknown) => {
        const parsed =
          validateDataWithZod<ForgotResetPasswordLogoutResponseType>(
            forgotResetPasswordLogoutResponseModel,
            res,
            'Invalid reset password data received from server'
          );
        return parsed ?? { success: false, message: '' };
      },
    }),
    restorePassword: builder.mutation<
      ForgotResetPasswordLogoutResponseType,
      string
    >({
      query: (email: string) => {
        return { url: 'password-reset', method: 'POST', body: { email } };
      },
      transformResponse: (res: ForgotResetPasswordLogoutResponseType) => {
        const parsed =
          validateDataWithZod<ForgotResetPasswordLogoutResponseType>(
            forgotResetPasswordLogoutResponseModel,
            res,
            'Invalid restore password data received from server'
          );
        return parsed ?? { success: false, message: '' };
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
