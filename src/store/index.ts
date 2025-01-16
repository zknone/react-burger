import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsApi } from '../services/api/ingredients-api/ingredients-api';
import chosenIngredientReducer from '../services/slices/chose-ingredient/reducers';
import burgerConstructorReducer from '../services/slices/constructor/reducers';

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  chosenIngredient: chosenIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ingredientsApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});
