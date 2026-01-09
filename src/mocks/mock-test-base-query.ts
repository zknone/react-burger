import type { AppBaseQuery } from '../types/types';
import { mockIngredients } from './data';
import { buildOrdersResponse, createPendingOrder } from './mock-order-utils';

const mockUser = {
  email: 'test@test.com',
  name: 'Test User',
};

const getMockTokens = () => ({
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
});

export const createTestBaseQuery =
  (baseQuery: AppBaseQuery): AppBaseQuery =>
  async (args, api, extraOptions) => {
    const url = typeof args === 'string' ? args : args?.url;
    const method =
      typeof args === 'string' ? 'GET' : (args?.method || 'GET').toUpperCase();
    let data: unknown;

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (url?.includes('/ingredients')) {
      // I mocked failing ingredients fetctching
      const shouldSendBroken = Math.random() < 1 / 3;
      data = shouldSendBroken
        ? {
            success: true,
            data: [{ bad: 'payload' }],
          }
        : { success: true, data: mockIngredients };
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
        data = buildOrdersResponse(
          orderNumber === null ? undefined : orderNumber
        );
      }
    } else if (url?.includes('/auth/login')) {
      const tokens = getMockTokens();
      data = { success: true, ...tokens, user: mockUser };
    } else if (url?.includes('/auth/register')) {
      const tokens = getMockTokens();
      data = { success: true, ...tokens, user: mockUser };
    } else if (url?.includes('/auth/logout')) {
      data = { success: true, message: 'Successful logout' };
    } else if (url?.includes('/auth/token')) {
      data = { success: true, ...getMockTokens() };
    } else if (url?.includes('/auth/user')) {
      data = { success: true, user: mockUser };
    } else if (url?.includes('/password-reset/reset')) {
      data = { success: true, message: 'Password successfully reset' };
    } else if (url?.includes('/password-reset')) {
      data = { success: true, message: 'Reset email sent' };
    }

    if (data) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 RTK Query Mock:', url, data);
      }
      return { data };
    }

    return baseQuery(args, api, extraOptions);
  };
