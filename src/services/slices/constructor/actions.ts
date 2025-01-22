import { createAction } from '@reduxjs/toolkit';
import { ExtendedIngredientType, IngredientType } from '../../../types/types';

export const addIngredient = createAction<ExtendedIngredientType>(
  'burgerConstructor/addIngredient'
);

export const addBun = createAction<IngredientType>('burgerConstructor/addBun');

export const removeIngredient = createAction<number>(
  'burgerConstructor/removeIngredient'
);

export const moveIngredient = createAction<{
  dragIndex: number;
  hoverIndex: number;
}>('burgerConstructor/moveIngredient');

export const emptyIngredients = createAction(
  'burgerConstructor/emptyIngredients'
);
