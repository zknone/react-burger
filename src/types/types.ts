import { z } from 'zod';

export const ingredientModel = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.enum(['bun', 'main', 'sauce']),
  proteins: z.number(),
  fat: z.number(),
  carbohydrates: z.number(),
  calories: z.number(),
  price: z.number(),
  image: z.string(),
  image_mobile: z.string(),
  image_large: z.string(),
  preparationTimeMinutes: z.number().optional(),
  __v: z.number(),
});

export type IngredientType = z.infer<typeof ingredientModel>;

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export const fetchedIngredientsModel = z.object({
  success: z.boolean(),
  data: z.array(ingredientModel),
});

export type FetchedIngredients = z.infer<typeof fetchedIngredientsModel>;

export const forgotResetPasswordLogoutResponseModel = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type ForgotResetPasswordLogoutResponseType = z.infer<
  typeof forgotResetPasswordLogoutResponseModel
>;

export const registerAuthorizationResponseModel = z.object({
  success: z.boolean(),
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type RegisterAuthorizationResponse = z.infer<
  typeof registerAuthorizationResponseModel
>;

export const tokenResponseModel = z.object({
  success: z.boolean(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type TokenResponse = z.infer<typeof tokenResponseModel>;

export const profileResponseModel = z.object({
  success: z.boolean(),
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
});
export type ProfileResponse = z.infer<typeof profileResponseModel>;

export const errorModel = z.object({
  status: z.number(),
  data: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
});
export type ErrorType = z.infer<typeof errorModel>;

export const loginRequestModel = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestModel>;

export const loginResponseModel = z.object({
  success: z.boolean(),
  accessToken: z.string(),
  refreshToken: z.string(),
  message: z.string().optional(),
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
});
export type LoginResponse = z.infer<typeof loginResponseModel>;

export const orderModel = z.object({
  ingredients: z.array(z.string()),
  _id: z.string(),
  status: z.enum(['done', 'pending', 'canceled']),
  number: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  isOrderHistoryItem: z.boolean().optional(),
  estimatedCookingTimeMinutes: z.number().optional(),
  estimatedReadyAt: z.string().optional(),
});

export type Order = z.infer<typeof orderModel>;

export const socketResponseModel = z.object({
  orders: z.array(orderModel),
  success: z.boolean(),
  total: z.number(),
  totalToday: z.number(),
});
export type SocketResponse = z.infer<typeof socketResponseModel>;

export const ingredientCacheModel = z.record(z.string(), ingredientModel);

export type IngredientCacheType = z.infer<typeof ingredientCacheModel>;

export const countedIngredientCacheModel = z.record(
  z.string(),
  z.object({
    value: ingredientModel,
    count: z.number(),
  })
);
export type CountedIngredientCacheType = z.infer<typeof countedIngredientCacheModel>;

export const extendedIngredientModel = ingredientModel.extend({
  uniqueId: z.string(),
});
export type ExtendedIngredientType = z.infer<typeof extendedIngredientModel>;

export type AppBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;
