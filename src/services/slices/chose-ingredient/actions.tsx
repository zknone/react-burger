import { createAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../../types/types';

export const chooseIngredient = createAction<IngredientType | null>(
  'chosenIngredient/chooseIngredient'
);
export const closeIngredient = createAction('chosenIngredient/closeIngredient');
