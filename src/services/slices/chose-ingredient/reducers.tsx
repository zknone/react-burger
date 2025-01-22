import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../../types/types';

const initialState: { selectedIngredient: IngredientType | null } = {
  selectedIngredient: null,
};

const chosenIngredientSlice = createSlice({
  name: 'chosenIngredient',
  initialState,
  reducers: {
    chooseIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.selectedIngredient = action.payload;
    },
    closeIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { chooseIngredient, closeIngredient } =
  chosenIngredientSlice.actions;
export default chosenIngredientSlice.reducer;
