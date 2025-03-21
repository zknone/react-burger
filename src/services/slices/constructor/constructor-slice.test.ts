import { expect } from '@jest/globals';

import {
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  emptyIngredients,
  burgerConstructorSlice,
} from './reducers';
import { ExtendedIngredientType, IngredientType } from '../../../types/types';

const mockSelectedIngredientFive: ExtendedIngredientType[] = [
  {
    _id: 'ingredient_1',
    uniqueId: 'unique_1',
    name: 'Classic Burger Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 250,
    price: 2.5,
    image: 'https://example.com/images/bun.png',
    image_mobile: 'https://example.com/images/bun_mobile.png',
    image_large: 'https://example.com/images/bun_large.png',
    __v: 1,
  },
  {
    _id: 'ingredient_2',
    uniqueId: 'unique_2',
    name: 'Beef Patty',
    type: 'main',
    proteins: 25,
    fat: 15,
    carbohydrates: 0,
    calories: 300,
    price: 5.0,
    image: 'https://example.com/images/patty.png',
    image_mobile: 'https://example.com/images/patty_mobile.png',
    image_large: 'https://example.com/images/patty_large.png',
    __v: 1,
  },
  {
    _id: 'ingredient_3',
    uniqueId: 'unique_3',
    name: 'Cheddar Cheese',
    type: 'main',
    proteins: 7,
    fat: 9,
    carbohydrates: 1,
    calories: 120,
    price: 1.5,
    image: 'https://example.com/images/cheese.png',
    image_mobile: 'https://example.com/images/cheese_mobile.png',
    image_large: 'https://example.com/images/cheese_large.png',
    __v: 1,
  },
  {
    _id: 'ingredient_4',
    uniqueId: 'unique_4',
    name: 'Lettuce',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 2,
    calories: 5,
    price: 0.5,
    image: 'https://example.com/images/lettuce.png',
    image_mobile: 'https://example.com/images/lettuce_mobile.png',
    image_large: 'https://example.com/images/lettuce_large.png',
    __v: 1,
  },
  {
    _id: 'ingredient_5',
    uniqueId: 'unique_5',
    name: 'BBQ Sauce',
    type: 'sauce',
    proteins: 1,
    fat: 0,
    carbohydrates: 10,
    calories: 50,
    price: 1.5,
    image: 'https://example.com/images/sauce.png',
    image_mobile: 'https://example.com/images/sauce_mobile.png',
    image_large: 'https://example.com/images/sauce_large.png',
    __v: 1,
  },
];

const stateWithFiveIngredients = {
  ...initialState,
  selectedIngredients: mockSelectedIngredientFive,
};

describe('constructor slice and state', () => {
  it('it should return initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should add bun', () => {
    const mockBun: ExtendedIngredientType = {
      _id: 'bun_1',
      name: 'Sesame Bun',
      type: 'bun',
      proteins: 8,
      fat: 4,
      carbohydrates: 30,
      calories: 220,
      price: 2.5,
      image: 'https://example.com/images/sesame_bun.png',
      image_mobile: 'https://example.com/images/sesame_bun_mobile.png',
      image_large: 'https://example.com/images/sesame_bun_large.png',
      __v: 0,
      uniqueId: '123',
    };

    expect(
      burgerConstructorSlice.reducer(initialState, addBun(mockBun))
    ).toEqual({
      ...initialState,
      bun: mockBun,
    });
  });

  it('should add selected ingredient', () => {
    const mockIngredient: IngredientType = {
      _id: 'ingredient_1',
      name: 'Classic Burger Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 30,
      calories: 250,
      price: 2.5,
      image: 'https://example.com/images/bun.png',
      image_mobile: 'https://example.com/images/bun_mobile.png',
      image_large: 'https://example.com/images/bun_large.png',
      __v: 1,
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(mockIngredient as ExtendedIngredientType)
    );

    expect(newState.selectedIngredients).toEqual(
      expect.arrayContaining([expect.objectContaining(mockIngredient)])
    );
  });

  it('should remove ingredient', () => {
    const mockSelectedIngredientWithoutThird: ExtendedIngredientType[] = [
      mockSelectedIngredientFive[0],
      mockSelectedIngredientFive[1],
      mockSelectedIngredientFive[3],
      mockSelectedIngredientFive[4],
    ];

    expect(
      burgerConstructorSlice.reducer(
        stateWithFiveIngredients,
        removeIngredient(2)
      )
    ).toEqual({
      ...initialState,
      selectedIngredients: mockSelectedIngredientWithoutThird,
    });
  });

  it('should move ingredients', () => {
    const mockMovedSelectedIngredient: ExtendedIngredientType[] = [
      mockSelectedIngredientFive[0],
      mockSelectedIngredientFive[1],
      mockSelectedIngredientFive[3],
      mockSelectedIngredientFive[2],
      mockSelectedIngredientFive[4],
    ];

    const newState = burgerConstructorSlice.reducer(
      stateWithFiveIngredients,
      moveIngredient({ dragIndex: 3, hoverIndex: 2 })
    );

    expect(newState.selectedIngredients).toEqual(mockMovedSelectedIngredient);
  });

  it('should empty engredients', () => {
    expect(
      burgerConstructorSlice.reducer(
        stateWithFiveIngredients,
        emptyIngredients()
      )
    ).toEqual(initialState);
  });
});
