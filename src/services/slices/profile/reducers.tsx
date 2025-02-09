import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileResponse } from '../../../types/types';

type Profile = {
  profile: { name: string; email: string };
  isAuthChecked: boolean;
};

const initialState: Profile = {
  profile: {
    name: '',
    email: '',
  },
  isAuthChecked: false,
};

const profileSlice = createSlice({
  name: 'chosenIngredient',
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.profile.email = action.payload.user.email;
      state.profile.name = action.payload.user.name;
    },
    changeProfile: (state, action: PayloadAction<Profile>) => {
      state = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { getProfile, changeProfile, setIsAuthChecked } =
  profileSlice.actions;
export default profileSlice.reducer;
