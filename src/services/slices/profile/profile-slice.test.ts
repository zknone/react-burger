import { expect } from '@jest/globals';

import {
  profileSlice,
  initialState,
  setProfile,
  resetProfile,
} from './reducers';
describe('profile slice store and actions', () => {
  it('should return initial state', () => {
    expect(profileSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('set name and email', () => {
    it('should set name and email', () => {
      const name = 'Ivan';
      const email = 'ivan@ivan.com';

      const newState = profileSlice.reducer(
        initialState,
        setProfile({
          user: { name, email },
          success: true,
        })
      );

      expect(newState).toEqual({ ...initialState, user: { name, email } });
    });
  });

  describe('state is reseted', () => {
    it('should be reseted', () => {
      const name = 'Ivan';
      const email = 'ivan@ivan.com';

      const newState = profileSlice.reducer(
        initialState,
        setProfile({
          user: { name, email },
          success: true,
        })
      );

      const expectedState = { ...initialState, isAuthChecked: true };

      expect(profileSlice.reducer(newState, resetProfile())).toEqual(
        expectedState
      );
    });
  });
});
