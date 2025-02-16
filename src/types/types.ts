export type IngredientType = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type FetchedIngredients = {
  success: boolean;
  data: IngredientType[];
};

export type ForgotResetPasswordLogoutResponse = {
  success: boolean;
  message: string;
};

export type RegisterAuthorizationResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type ProfileResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};
export type ErrorType = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  message?: string;
  user: {
    email: string;
    name: string;
  };
};

export type ExtendedIngredientType = IngredientType & { uniqueId: string };
