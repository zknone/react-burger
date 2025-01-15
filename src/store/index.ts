import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsApi } from '../services/api/api';

const rootReducer = combineSlices(ingredientsApi);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ingredientsApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});
