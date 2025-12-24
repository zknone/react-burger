import type { AppBaseQuery } from './base-query';
import { mockIngredients } from '../../mocks/data';
import {
  buildOrdersResponse,
  createPendingOrder,
} from '../../mocks/mock-order-utils';

export const createTestBaseQuery = (
  baseQuery: AppBaseQuery
): AppBaseQuery => async (
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
      const body = typeof args === 'string' ? undefined : args.body;
      const newOrder = createPendingOrder(body);
      data = {
        success: true,
        name: newOrder.name,
        order: {
          number: newOrder.number,
          estimatedCookingTimeMinutes: newOrder.estimatedCookingTimeMinutes,
          estimatedReadyAt: newOrder.estimatedReadyAt,
        },
      };
    } else {
      const match = url.match(/\/orders\/?(\d+)?/);
      const orderNumber = match?.[1] ? Number.parseInt(match[1]) : null;
      data = buildOrdersResponse(orderNumber === null ? undefined : orderNumber);
    }
  }

  if (data) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 RTK Query Mock:', url, data);
    }
    return { data };
  }

  return baseQuery(args, api, extraOptions);
};
