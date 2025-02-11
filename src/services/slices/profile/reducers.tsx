import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileResponse } from '../../../types/types';

type Profile = {
  user: { name: string; email: string };
  isAuthChecked: boolean;
};

const initialState: Profile = {
  user: {
    name: '',
    email: '',
  },
  isAuthChecked: false,
};

const profileSlice = createSlice({
  name: 'chosenIngredient',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    resetProfile: (state) => {
      state.user = { name: '', email: '' };
      state.isAuthChecked = true;
    },
  },
});

export const { setProfile, setIsAuthChecked, resetProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
