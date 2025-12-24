import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createTestBaseQuery } from './test-base-query';

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

export const getBaseQuery = (productionBaseQuery: BaseQuery): BaseQuery =>
  process.env.NODE_ENV === 'development'
    ? createTestBaseQuery(productionBaseQuery)
    : productionBaseQuery;
