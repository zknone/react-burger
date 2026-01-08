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
import { transformCustomResponse } from '../../../utils/api';
import {
  setTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from '../../../utils/tokens';

export const ingredientsApiConfig = {
  baseUrl: BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
};

export const emptyLoginResponse: LoginResponse = {
  success: false,
  accessToken: '',
  refreshToken: '',
  user: { email: '', name: '' },
};

export const transformLoginResponse = (res: LoginResponse) =>
  transformCustomResponse(
    res,
    loginResponseModel,
    'Invalid login data received from server',
    emptyLoginResponse
  );

export const emptyRegisterResponse: RegisterAuthorizationResponse = {
  success: false,
  accessToken: '',
  refreshToken: '',
  user: { email: '', name: '' },
};

export const transformRegisterResponse = (res: RegisterAuthorizationResponse) =>
  transformCustomResponse(
    res,
    registerAuthorizationResponseModel,
    'Invalid registration data received from server',
    emptyRegisterResponse
  );

export const emptyProfileResponse: ProfileResponse = {
  success: false,
  user: { email: '', name: '' },
};

export const emptyLogoutResponse: ForgotResetPasswordLogoutResponseType = {
  success: false,
  message: '',
};

export const emptyTokenResponse: TokenResponse = {
  success: false,
  accessToken: '',
  refreshToken: '',
};

export const transformChangeProfileResponse = (res: ProfileResponse) =>
  transformCustomResponse(
    res,
    profileResponseModel,
    'Invalid change profile data received from server',
    emptyProfileResponse
  );

export const transformLogoutResponse = (
  res: ForgotResetPasswordLogoutResponseType
) =>
  transformCustomResponse(
    res,
    forgotResetPasswordLogoutResponseModel,
    'Invalid logout data received from server',
    emptyLogoutResponse
  );

export const transformTokenResponse = (res: TokenResponse) =>
  transformCustomResponse(
    res,
    tokenResponseModel,
    'Invalid token data received from server',
    emptyTokenResponse
  );

export const transformGetUserResponse = (res: ProfileResponse) =>
  transformCustomResponse(
    res,
    profileResponseModel,
    'Invalid profile data received from server',
    emptyProfileResponse
  );

export const transformResetPasswordResponse = (
  res: ForgotResetPasswordLogoutResponseType
) =>
  transformCustomResponse(
    res,
    forgotResetPasswordLogoutResponseModel,
    'Invalid reset password data received from server',
    emptyLogoutResponse
  );

export const transformRestorePasswordResponse = (
  res: ForgotResetPasswordLogoutResponseType
) =>
  transformCustomResponse(
    res,
    forgotResetPasswordLogoutResponseModel,
    'Invalid restore password data received from server',
    emptyLogoutResponse
  );

const fetchWithRefreshQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = getAccessToken();
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
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      return result;
    }

    const refreshResult = await api.dispatch(
      authorizationApi.endpoints.token.initiate(refreshToken)
    );

    if ('data' in refreshResult) {
      const newAccessToken = refreshResult.data?.accessToken;
      if (newAccessToken) {
        setTokens(newAccessToken, refreshToken);
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      clearTokens();
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
      transformResponse: transformLoginResponse,
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
      transformResponse: transformRegisterResponse,
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
      transformResponse: (res: ProfileResponse) =>
        transformChangeProfileResponse(res),
    }),
    logout: builder.mutation<ForgotResetPasswordLogoutResponseType, string>({
      query: (refreshToken: string) => {
        return {
          url: '/auth/logout',
          method: 'POST',
          body: { token: refreshToken },
        };
      },
      transformResponse: (res: ForgotResetPasswordLogoutResponseType) =>
        transformLogoutResponse(res),
    }),
    token: builder.mutation<TokenResponse, string>({
      query: (refreshToken) => ({
        url: '/auth/token',
        method: 'POST',
        body: { token: refreshToken },
      }),
      transformResponse: (res: TokenResponse) => transformTokenResponse(res),
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
      transformResponse: (res: ProfileResponse) => transformGetUserResponse(res),
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
      transformResponse: (res: ForgotResetPasswordLogoutResponseType) =>
        transformResetPasswordResponse(res),
    }),
    restorePassword: builder.mutation<
      ForgotResetPasswordLogoutResponseType,
      string
    >({
      query: (email: string) => {
        return { url: 'password-reset', method: 'POST', body: { email } };
      },
      transformResponse: (res: ForgotResetPasswordLogoutResponseType) =>
        transformRestorePasswordResponse(res),
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
