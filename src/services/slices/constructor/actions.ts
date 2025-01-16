import { createAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../../types/types';

export const addIngredient = createAction<IngredientType>(
  'burgerConstructor/addIngredient'
);

export const addBun = createAction<IngredientType>('burgerConstructor/addBun');

export const removeIngredient = createAction<IngredientType>(
  'burgerConstructor/addBun'
);
