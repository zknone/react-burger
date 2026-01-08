import { describe, expect, it, jest } from '@jest/globals';
import { IngredientCacheType, IngredientType } from '../types/types';
import {
  buildOrderTiming,
  createIngredientCache,
  estimateCookingTimeMinutes,
} from './order-time';

describe('calculate order time', () => {
  const mockIngredients: IngredientType[] = [
    {
      _id: 'bun-1',
      name: 'Plain Bun',
      type: 'bun',
      proteins: 8,
      fat: 6,
      carbohydrates: 28,
      calories: 190,
      price: 2,
      image: 'https://example.com/bun.png',
      image_mobile: 'https://example.com/bun-mobile.png',
      image_large: 'https://example.com/bun-large.png',
      preparationTimeMinutes: 2,
      __v: 0,
    },
    {
      _id: 'main-1',
      name: 'Beef Patty',
      type: 'main',
      proteins: 20,
      fat: 18,
      carbohydrates: 0,
      calories: 250,
      price: 5,
      image: 'https://example.com/patty.png',
      image_mobile: 'https://example.com/patty-mobile.png',
      image_large: 'https://example.com/patty-large.png',
      preparationTimeMinutes: 5,
      __v: 0,
    },
    {
      _id: 'sauce-1',
      name: 'Ketchup',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 6,
      calories: 25,
      price: 1,
      image: 'https://example.com/ketchup.png',
      image_mobile: 'https://example.com/ketchup-mobile.png',
      image_large: 'https://example.com/ketchup-large.png',
      __v: 0,
    },
  ];

  const mockIds = ['bun-1', 'bun-1', 'main-1', 'sauce-1'];

  const mockIngredientsCache: IngredientCacheType = {
    'bun-1': { ...mockIngredients[0] },
    'main-1': { ...mockIngredients[1] },
    'sauce-1': { ...mockIngredients[2] },
  };
  it('creates ingredients cache', () => {
    const cachedMockIngredients = createIngredientCache(mockIngredients);
    expect(cachedMockIngredients).toEqual(mockIngredientsCache);
  });

  it('should estimate cooking time in minutes', () => {
    const estimateTime = estimateCookingTimeMinutes(mockIds, mockIngredients);

    expect(typeof estimateTime).toBe('number');
    expect(estimateTime).toBeGreaterThan(0);
    expect(estimateTime).toEqual(9);
  });

  it('should build order timings', () => {
    const minuteToMs = 1000;
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(0);

    const result = buildOrderTiming(mockIds, mockIngredients, minuteToMs);

    expect(result.estimatedCookingTimeMinutes).toBe(9);
    expect(result.autoCompleteDelayMs).toBe(9000);
    expect(result.estimatedReadyAt).toBe(new Date(9000).toISOString());

    nowSpy.mockRestore();
  });
});
