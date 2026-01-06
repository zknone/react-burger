import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileResponse } from '../../../types/types';

type Profile = {
  user: { name: string; email: string };
  hasAuthStatus: boolean;
  canResetPassword: boolean;
};

export const initialState: Profile = {
  user: {
    name: '',
    email: '',
  },
  hasAuthStatus: false,
  canResetPassword: false,
};

const profileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
    },
    setHasAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.hasAuthStatus = action.payload;
    },
    setCanResetPassword: (state, action: PayloadAction<boolean>) => {
      state.canResetPassword = action.payload;
    },
    resetProfile: (state) => {
      state.user = { name: '', email: '' };
      state.hasAuthStatus = true;
    },
  },
});

export const {
  setProfile,
  setHasAuthStatus,
  resetProfile,
  setCanResetPassword,
} = profileSlice.actions;
export { profileSlice };
export default profileSlice.reducer;
