import { describe, expect, jest } from '@jest/globals';

import {
  testError,
  testFallback,
  testParsedResponse,
} from '../../../utils/testing';

import {
  emptyOrderResponse,
  emptyCreateOrderResponse,
  transformCreateOrderResponse,
  transformGetOrderResponse,
  getOrderQuery,
} from './order-api';
import type { CreateOrderResponse, OrderResponse } from '../../../types/types';

jest.mock('../../../utils/validation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/logger', () => ({
  logError: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@reduxjs/toolkit/query/react', () => {
  const actual = jest.requireActual<
    typeof import('@reduxjs/toolkit/query/react')
  >('@reduxjs/toolkit/query/react');
  return {
    ...actual,
    fetchBaseQuery: jest.fn(() => jest.fn()),
  };
});

describe('order api', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: jest.fn(() => ''),
      },
      configurable: true,
    });
  });

  const validCreateResponse: CreateOrderResponse = {
    success: true,
    name: '123',
    order: {
      number: 123,
      estimatedCookingTimeMinutes: 5,
      estimatedReadyAt: '123234',
      _id: '1',
      status: 'pending',
      createdAt: '123',
      updatedAt: '123',
      ingredients: ['bun', 'sauce', 'bun', 'main'],
    },
  };

  const nonValidOrderWithoutOrderNumber: CreateOrderResponse = {
    success: true,
    name: '123',
    order: {
      number: undefined,
      estimatedCookingTimeMinutes: 5,
      estimatedReadyAt: '123234',
      _id: '1',
      status: 'pending',
      createdAt: '123',
      updatedAt: '123',
      ingredients: ['bun', 'sauce', 'bun', 'main'],
    },
  } as unknown as CreateOrderResponse;

  const nonValidOrderWithoutProperStatus: CreateOrderResponse = {
    success: true,
    name: '123',
    order: {
      number: 1,
      estimatedCookingTimeMinutes: 5,
      estimatedReadyAt: '123234',
      _id: '1',
      status: 'stupid',
      createdAt: '123',
      updatedAt: '123',
      ingredients: ['bun', 'sauce', 'bun', 'main'],
    },
  } as unknown as CreateOrderResponse;

  const validGetOrderResponse: OrderResponse = {
    success: true,
    orders: [
      {
        ingredients: ['bun', 'sauce', 'bun', 'main'],
        _id: '1',
        status: 'pending',
        number: 123,
        createdAt: '123',
        updatedAt: '123',
        name: 'Test order',
      },
    ],
  };
  const nonValidGetOrderResponseWithWrongStatus: OrderResponse = {
    success: true,
    orders: [
      {
        ingredients: ['bun', 'sauce', 'bun', 'main'],
        _id: '1',
        status: 'stupid',
        number: 123,
        createdAt: '123',
        updatedAt: '123',
        name: 'Test order',
      },
    ],
  } as unknown as OrderResponse;

  const nonValidGetOrderResponseWithWrongId: OrderResponse = {
    success: true,
    orders: [
      {
        ingredients: ['bun', 'sauce', 'bun', 'main'],
        _id: 2,
        status: 'pending',
        number: 123,
        createdAt: '123',
        updatedAt: '123',
        name: 'Test order',
      },
    ],
  } as unknown as OrderResponse;

  describe('should make order', () => {
    testParsedResponse(
      'returns valid response of making order',
      validCreateResponse,
      transformCreateOrderResponse
    );
    testFallback(
      'fallbacks with nonvalid response',
      validCreateResponse,
      emptyCreateOrderResponse,
      transformCreateOrderResponse
    );
    testFallback(
      'fallbacks with nonvalid response. Lack of order number',
      nonValidOrderWithoutOrderNumber,
      emptyCreateOrderResponse,
      transformCreateOrderResponse
    );
    testFallback(
      'fallbacks with nonvalid response. Wrong status',
      nonValidOrderWithoutProperStatus,
      emptyCreateOrderResponse,
      transformCreateOrderResponse
    );
    testError(
      'logs error and returns fallback when validation throws',
      validCreateResponse,
      emptyCreateOrderResponse,
      transformCreateOrderResponse,
      'Invalid order creation response received from server'
    );
  });

  describe('should get order', () => {
    testParsedResponse(
      'returns valid response of fetching order',
      validGetOrderResponse,
      transformGetOrderResponse
    );
    testFallback(
      'fallbacks with nonvalid response',
      validGetOrderResponse,
      emptyOrderResponse,
      transformGetOrderResponse
    );
    testFallback(
      'fallbacks with nonvalid response. Wrong status',
      nonValidGetOrderResponseWithWrongStatus,
      emptyOrderResponse,
      transformGetOrderResponse
    );
    testFallback(
      'fallbacks with nonvalid response. Wrong id',
      nonValidGetOrderResponseWithWrongId,
      emptyOrderResponse,
      transformGetOrderResponse
    );
    testError(
      'logs error and returns fallback when validation throws',
      validGetOrderResponse,
      emptyOrderResponse,
      transformGetOrderResponse,
      'Invalid order response received from server'
    );
  });

  describe('getOrder query', () => {
    it('throws when number is not provided', () => {
      expect(() => getOrderQuery(undefined)).toThrow(
        'There is no order number'
      );
    });

    it('returns correct url for valid number', () => {
      const result = getOrderQuery(123);

      expect(result.url).toBe('/orders/123');
      expect(result.method).toBe('GET');
    });
  });
});
