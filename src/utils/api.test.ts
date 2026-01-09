import { expect } from '@jest/globals';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import {
  useRegister,
  useLogin,
  useLogout,
  useResetPassword,
  useRestorePassword,
  useProfile,
} from './api-hooks';
import {
  useChangeProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useRestorePasswordMutation,
} from '../services/api/authorization-api/authorisation-api';
import { clearTokens, setTokens } from './tokens';

type ApiResponse = {
  status: number | string;
  data: unknown;
};

jest.mock('../services/api/authorization-api/authorisation-api', () => ({
  useChangeProfileMutation: jest.fn(),
  useLoginMutation: jest.fn(),
  useLogoutMutation: jest.fn(),
  useRegisterMutation: jest.fn(),
  useResetPasswordMutation: jest.fn(),
  useRestorePasswordMutation: jest.fn(),
}));

jest.mock('./tokens', () => {
  const actual = jest.requireActual('./tokens');
  return {
    ...actual,
    getRefreshToken: jest.fn(() => 'refresh'),
    setTokens: jest.fn(actual.setTokens),
    clearTokens: jest.fn(actual.clearTokens),
  };
});

const createWrapper = () => {
  const store = configureStore({
    reducer: (state = {}) => state,
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(Provider, { store, children });
};

describe('api utilities', () => {
  const mockUserCredentials = {
    name: 'Ivan Ivanov',
    email: 'ivanov@gmail.com',
  };

  const mockData = {
    ...mockUserCredentials,
    password: 'qwerty123',
  };

  describe('register user', () => {
    it('should register new user with setting tokens', async () => {
      clearTokens();

      const registerTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
        }),
      });

      const loginTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
          accessToken: 'access',
          refreshToken: 'refresh',
        }),
      });

      (useRegisterMutation as jest.Mock).mockReturnValue([
        registerTrigger,
        { isLoading: false, error: null },
      ]);

      (useLoginMutation as jest.Mock).mockReturnValue([
        loginTrigger,
        { isLoading: false, error: null },
      ]);

      const { result } = renderHook(() => useRegister(), {
        wrapper: createWrapper(),
      });

      let response: ApiResponse | undefined;
      await act(async () => {
        response = await result.current.registerUser(mockData);
      });

      if (!response) {
        throw new Error('Expected registerUser response');
      }

      expect(response.status).toBe(200);
      expect(registerTrigger).toHaveBeenCalled();
      expect(loginTrigger).toHaveBeenCalled();
      expect(setTokens).toHaveBeenCalledWith('access', 'refresh');
    });
  });

  describe('login user', () => {
    it('logins user with setting tokens', async () => {
      clearTokens();
      const loginTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
          accessToken: 'access',
          refreshToken: 'refresh',
        }),
      });

      (useLoginMutation as jest.Mock).mockReturnValue([
        loginTrigger,
        { isLoading: false, error: null },
      ]);

      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      let response: ApiResponse | undefined;
      await act(async () => {
        response = await result.current.loginUser(mockData);
      });

      if (!response) {
        throw new Error('Expected loginUser response');
      }

      expect(response.status).toBe(200);
      expect(loginTrigger).toHaveBeenCalled();
      expect(setTokens).toHaveBeenCalledWith('access', 'refresh');
    });
  });

  describe('logout user', () => {
    it('logouts user with clearing tokens', async () => {
      const logoutTrigger = jest.fn().mockResolvedValue({
        success: true,
      });

      (useLogoutMutation as jest.Mock).mockReturnValue([
        logoutTrigger,
        {
          isLoading: false,
          error: null,
        },
      ]);

      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper(),
      });

      let response: ApiResponse | undefined;
      await act(async () => {
        response = await result.current.logoutUser();
      });

      expect(response?.status).toBe(200);
      expect(logoutTrigger).toHaveBeenCalled();
      expect(clearTokens).toHaveBeenCalled();
    });
  });

  describe('change profile data', () => {
    it('should change profile data', async () => {
      const changeProfileDataTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
          user: mockUserCredentials,
        }),
      });

      (useChangeProfileMutation as jest.Mock).mockReturnValue([
        changeProfileDataTrigger,
        { isLoading: false, error: null },
      ]);

      const { result } = renderHook(() => useProfile(), {
        wrapper: createWrapper(),
      });

      let response: ApiResponse | undefined;
      await act(async () => {
        response = await result.current.changeProfileCredentials(mockData);
      });

      if (!response) {
        throw new Error('Expected changeProfileCredentials response');
      }

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        success: true,
        user: mockUserCredentials,
      });
      expect(changeProfileDataTrigger).toHaveBeenCalled();
    });
  });

  describe('reset password', () => {
    it('should reset password ', async () => {
      const changePasswordTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
          message: 'changed',
        }),
      });

      (useResetPasswordMutation as jest.Mock).mockReturnValue([
        changePasswordTrigger,
        { isLoading: false, error: null },
      ]);

      const { result } = renderHook(() => useResetPassword(), {
        wrapper: createWrapper(),
      });

      let response: ApiResponse | undefined;
      await act(async () => {
        response = await result.current.resetPass('refresh', 'new_pass');
      });

      if (!response) {
        throw new Error('Expected resetPass response');
      }

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        success: true,
      });
      expect(changePasswordTrigger).toHaveBeenCalledWith({
        token: 'refresh',
        password: 'new_pass',
      });
      expect(changePasswordTrigger).toHaveBeenCalled();
    });
  });

  describe('restore password', () => {
    it('should restore password', async () => {
      const restorePasswordTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
          message: 'email sent',
        }),
      });

      (useRestorePasswordMutation as jest.Mock).mockReturnValue([
        restorePasswordTrigger,
        { isLoading: false, error: null },
      ]);

      const { result } = renderHook(() => useRestorePassword(), {
        wrapper: createWrapper(),
      });

      let response: ApiResponse | undefined;
      await act(async () => {
        response = await result.current.restorePass('ivanov@gmail.com');
      });

      if (!response) {
        throw new Error('Expected restorePass response');
      }

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        success: true,
        message: 'email sent',
      });
      expect(restorePasswordTrigger).toHaveBeenCalledWith('ivanov@gmail.com');
    });
  });
});
