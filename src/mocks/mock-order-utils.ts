import { addMockOrder, getMockOrders } from './mock-orders-store';
import { Order } from '../types/types';
import { buildOrderTiming } from '../utils/order-time';
import { mockIngredients } from './data';

const parseJsonSafe = (payload: unknown): unknown => {
  if (typeof payload !== 'string') return payload;
  try {
    return JSON.parse(payload);
  } catch (error) {
    console.warn('Failed to parse mock payload', error);
    return undefined;
  }
};

export const extractIngredients = (body: unknown): string[] => {
  const parsedBody = parseJsonSafe(body) as { ingredients?: string[] } | undefined;
  return parsedBody?.ingredients || [];
};

export const createPendingOrder = (body: unknown): Order => {
  const ingredients = extractIngredients(body);
  const { autoCompleteDelayMs, estimatedCookingTimeMinutes, estimatedReadyAt } =
    buildOrderTiming(ingredients, mockIngredients);

  return addMockOrder(ingredients, {
    status: 'pending',
    autoCompleteDelayMs,
    estimatedCookingTimeMinutes,
    estimatedReadyAt,
    isUserOrder: true,
  });
};

export const buildOrdersResponse = (orderNumber?: number) => {
  const orders = getMockOrders();
  const filteredOrders =
    orderNumber !== undefined
      ? orders.filter((item) => item.number === orderNumber)
      : orders;

  return {
    success: true,
    orders: filteredOrders,
  };
};
