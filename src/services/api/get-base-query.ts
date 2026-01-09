import type { AppBaseQuery } from '../../types/types';
import { createTestBaseQuery } from '../../mocks/mock-test-base-query';

export const getBaseQuery = (
  productionBaseQuery: AppBaseQuery
): AppBaseQuery =>
  import.meta.env.VITE_USE_MOCKS === 'true'
    ? createTestBaseQuery(productionBaseQuery)
    : productionBaseQuery;
