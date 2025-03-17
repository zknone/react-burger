import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedIngredientType, IngredientType } from '../../../types/types';

export const initialState: {
  bun: IngredientType | null;
  selectedIngredients: ExtendedIngredientType[];
} = {
  bun: null,
  selectedIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<ExtendedIngredientType>) => {
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const newIngredients = [...state.selectedIngredients];
      newIngredients.splice(index, 1);
      return {
        ...state,
        selectedIngredients: newIngredients,
      };
    },
    addBun: (state, action: PayloadAction<ExtendedIngredientType>) => {
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
    emptyIngredients: (state) => {
      state.bun = null;
      state.selectedIngredients = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  addBun,
  moveIngredient,
  emptyIngredients,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
export { burgerConstructorSlice };
