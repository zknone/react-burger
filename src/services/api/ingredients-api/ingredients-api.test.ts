import { describe, jest } from '@jest/globals';
import { FetchedIngredients } from '../../../types/types';
import {
  testError,
  testFallback,
  testParsedResponse,
} from '../../../utils/testing';
import {
  emptyFetchedIngredients,
  transformIngredientsResponse,
} from './ingredients-api';

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

describe('ingredients api transform', () => {
  const validResponse: FetchedIngredients = {
    success: true,
    data: [
      {
        _id: 'ingredient-1',
        name: 'Test Bun',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 50,
        image: 'https://example.com/image.png',
        image_mobile: 'https://example.com/image-mobile.png',
        image_large: 'https://example.com/image-large.png',
        __v: 0,
      },
    ],
  };

  const validResponseWithMultipleIngredients: FetchedIngredients = {
    success: true,
    data: [
      {
        _id: 'ingredient-1',
        name: 'Test Bun',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 50,
        image: 'https://example.com/image.png',
        image_mobile: 'https://example.com/image-mobile.png',
        image_large: 'https://example.com/image-large.png',
        __v: 0,
      },
      {
        _id: 'ingredient-2',
        name: 'Test Bun',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 50,
        image: 'https://example.com/image.png',
        image_mobile: 'https://example.com/image-mobile.png',
        image_large: 'https://example.com/image-large.png',
        __v: 0,
      },
      {
        _id: 'ingredient-3',
        name: 'Test Bun',
        type: 'sauce',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 50,
        image: 'https://example.com/image.png',
        image_mobile: 'https://example.com/image-mobile.png',
        image_large: 'https://example.com/image-large.png',
        __v: 0,
      },
      {
        _id: 'ingredient-4',
        name: 'Test Bun',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 50,
        image: 'https://example.com/image.png',
        image_mobile: 'https://example.com/image-mobile.png',
        image_large: 'https://example.com/image-large.png',
        __v: 0,
      },
    ],
  };

  const validResponseWithMultipleIngredientsAndOptionalTime: FetchedIngredients =
    {
      success: true,
      data: [
        {
          _id: 'ingredient-1',
          name: 'Test Bun',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 150,
          price: 50,
          image: 'https://example.com/image.png',
          image_mobile: 'https://example.com/image-mobile.png',
          image_large: 'https://example.com/image-large.png',
          __v: 0,
          preparationTimeMinutes: 10,
        },
        {
          _id: 'ingredient-2',
          name: 'Test Bun',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 150,
          price: 50,
          image: 'https://example.com/image.png',
          image_mobile: 'https://example.com/image-mobile.png',
          image_large: 'https://example.com/image-large.png',
          __v: 0,
          preparationTimeMinutes: 3,
        },
        {
          _id: 'ingredient-3',
          name: 'Test Bun',
          type: 'sauce',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 150,
          price: 50,
          image: 'https://example.com/image.png',
          image_mobile: 'https://example.com/image-mobile.png',
          image_large: 'https://example.com/image-large.png',
          __v: 0,
        },
        {
          _id: 'ingredient-4',
          name: 'Test Bun',
          type: 'main',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 150,
          price: 50,
          image: 'https://example.com/image.png',
          image_mobile: 'https://example.com/image-mobile.png',
          image_large: 'https://example.com/image-large.png',
          __v: 0,
        },
      ],
    };

  const nonValidResponse = {
    success: true,
    data: [
      {
        _id: 'ingredient-1',
        name: 'Test Bun',
        type: 'drink',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 50,
        image: 'https://example.com/image.png',
        image_mobile: 'https://example.com/image-mobile.png',
        image_large: 'https://example.com/image-large.png',
        __v: 0,
      },
    ],
  } as unknown as FetchedIngredients;

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validResponse,
    transformIngredientsResponse
  );

  testParsedResponse(
    'returns parsed response with multiple ingredients when validation succeeds',
    validResponseWithMultipleIngredients,
    transformIngredientsResponse
  );

  testParsedResponse(
    'returns parsed response with multiple ingredients and optional timings when validation succeeds',
    validResponseWithMultipleIngredientsAndOptionalTime,
    transformIngredientsResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validResponse,
    emptyFetchedIngredients,
    transformIngredientsResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validResponse,
    emptyFetchedIngredients,
    transformIngredientsResponse,
    'Invalid ingredients data received from server'
  );

  testError(
    'logs error and returns fallback when validation throws with incorrect type',
    nonValidResponse,
    emptyFetchedIngredients,
    transformIngredientsResponse,
    'Invalid ingredients data received from server'
  );
});
