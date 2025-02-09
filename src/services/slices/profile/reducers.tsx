import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileResponse } from '../../../types/types';

type Profile = { name: string; email: string };

const initialState: Profile = {
  name: '',
  email: '',
};

const profileSlice = createSlice({
  name: 'chosenIngredient',
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
    },
    changeProfile: (state, action: PayloadAction<Profile>) => {
      state = action.payload;
    },
  },
});

export const { getProfile, changeProfile } = profileSlice.actions;
export default profileSlice.reducer;
