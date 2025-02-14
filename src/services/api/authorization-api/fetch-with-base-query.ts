import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { authorizationApi, BASE_API_URL } from './authorization-api';

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

export default fetchWithRefreshQuery;
