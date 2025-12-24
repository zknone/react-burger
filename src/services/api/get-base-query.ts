import type { AppBaseQuery } from './base-query';
import { createTestBaseQuery } from './test-base-query';

export const getBaseQuery = (
  productionBaseQuery: AppBaseQuery
): AppBaseQuery =>
  process.env.NODE_ENV === 'development'
    ? createTestBaseQuery(productionBaseQuery)
    : productionBaseQuery;
