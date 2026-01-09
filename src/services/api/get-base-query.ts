import type { AppBaseQuery } from '../../types/types';
import { createTestBaseQuery } from '../../mocks/mock-test-base-query';

export const getBaseQuery = (
  productionBaseQuery: AppBaseQuery
): AppBaseQuery =>
  process.env.NODE_ENV === 'development'
    ? createTestBaseQuery(productionBaseQuery)
    : productionBaseQuery;
