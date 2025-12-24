import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { mockIngredients, mockOrders } from '../../mocks/data';

type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

export const createTestBaseQuery = (baseQuery: BaseQuery): BaseQuery => async (
  args,
  api,
  extraOptions
) => {
  const url = typeof args === 'string' ? args : args?.url;
  let data: unknown;

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (url?.includes('/ingredients')) {
    data = { success: true, data: mockIngredients };
  } else if (url?.includes('/orders')) {
    const order = mockOrders[0];
    data = { success: true, name: order.name, order: { number: order.number } };
  }

  if (data) {
    console.log('🚀 RTK Query Mock:', url, data);
    return { data };
  }

  return baseQuery(args, api, extraOptions);
};
