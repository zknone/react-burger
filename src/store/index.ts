import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsApi } from '../services/api/ingredients-api/ingredients-api';
import chosenIngredientReducer from '../services/slices/chose-ingredient/reducers';
import burgerConstructorReducer from '../services/slices/constructor/reducers';
import { orderApi } from '../services/api/order-api/order-api';
import { authorizationApi } from '../services/api/authorization-api/authorization-api';

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  chosenIngredient: chosenIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      orderApi.middleware,
      authorizationApi.middleware
    );
  },
  devTools: process.env.NODE_ENV !== 'production',
});
