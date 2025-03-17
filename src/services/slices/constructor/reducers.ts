import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedIngredientType, IngredientType } from '../../../types/types';
import { v4 as uuid4 } from 'uuid';

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
    addIngredient: {
      reducer: (state, action: PayloadAction<ExtendedIngredientType>) => {
        state.selectedIngredients.push(action.payload);
      },
      prepare: (ingredient: IngredientType) => {
        return { payload: { ...ingredient, uniqueId: uuid4() } };
      },
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
