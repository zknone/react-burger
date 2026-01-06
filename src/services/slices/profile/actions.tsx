import { createAction } from '@reduxjs/toolkit';
import { ProfileResponse } from '../../../types/types';

export const getProfile = createAction<ProfileResponse | null>(
  'profile/getProfile'
);
export const changeProfile = createAction<{ name: string; email: string }>(
  'profile/changeProfile'
);
export const setHasAuthStatus = createAction<boolean>(
  'profile/setHasAuthStatus'
);
export const setCanResetPassword = createAction<boolean>(
  'profile/setCanResetPassword'
);
export const resetProfile = createAction('profile/resetProfile');
