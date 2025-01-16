import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../../types/types';

const initialState: {
  bun: IngredientType | null;
  selectedIngredients: IngredientType[];
} = {
  bun: null,
  selectedIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'chosenIngredient',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item._id !== action.payload._id
      );
    },
    addBun: (state, action: PayloadAction<IngredientType>) => {
      state.bun = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
