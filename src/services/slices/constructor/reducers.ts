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
  name: 'burgerConstructor',
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
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const newIngredients = [...state.selectedIngredients];
      const [movedItem] = newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, movedItem);
      return {
        ...state,
        selectedIngredients: newIngredients,
      };
    },
  },
});

export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
