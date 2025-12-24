import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { mockIngredients } from '../../mocks/data';
import { addMockOrder, getMockOrders } from '../../mocks/mock-orders-store';

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
  const method =
    typeof args === 'string'
      ? 'GET'
      : (args?.method || 'GET').toUpperCase();
  let data: unknown;

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (url?.includes('/ingredients')) {
    data = { success: true, data: mockIngredients };
  } else if (url?.includes('/orders')) {
    if (method === 'POST') {
      const parsedBody =
        typeof args === 'string'
          ? undefined
          : typeof args.body === 'string'
            ? (() => {
                try {
                  return JSON.parse(args.body);
                } catch (error) {
                  console.warn('Failed to parse mock order body', error);
                  return undefined;
                }
              })()
            : args.body;
      const body = typeof args === 'string' ? undefined : parsedBody;
      const ingredients = (body as { ingredients?: string[] })?.ingredients;
      const newOrder = addMockOrder(ingredients || [], {
        status: 'pending',
        autoCompleteDelayMs: 3000,
      });
      data = {
        success: true,
        name: newOrder.name,
        order: { number: newOrder.number },
      };
    } else {
      const match = url.match(/\/orders\/?(\d+)?/);
      const orderNumber = match?.[1] ? Number.parseInt(match[1]) : null;
      const orders = getMockOrders();
      const filteredOrders = orderNumber
        ? orders.filter((item) => item.number === orderNumber)
        : orders;

      data = {
        success: true,
        orders: filteredOrders,
      };
    }
  }

  if (data) {
    console.log('🚀 RTK Query Mock:', url, data);
    return { data };
  }

  return baseQuery(args, api, extraOptions);
};
