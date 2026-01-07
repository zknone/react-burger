import { expect } from '@jest/globals';

import {
  useRegister,
  useLogin,
  useLogout,
  useResetPassword,
  useRestorePassword,
  useProfile,
} from './api';
import {
  useChangeProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useRestorePasswordMutation,
} from '../services/api/authorization-api/authorization-api';
import { clearTokens, setTokens } from './tokens';

jest.mock('./tokens', () => {
  const actual = jest.requireActual('./tokens');
  return {
    ...actual,
    getRefreshToken: jest.fn(() => 'refresh'),
    setTokens: jest.fn(actual.setTokens),
    clearTokens: jest.fn(actual.clearTokens),
  };
});

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
      const { registerUser } = useRegister();

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

      const result = await registerUser(mockData);
      expect(result.status).toBe(200);
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

      const { loginUser } = useLogin();

      const result = await loginUser(mockData);

      expect(result.status).toBe(200);
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

      const { logoutUser } = useLogout();

      const result = await logoutUser();
      expect(result?.status).toBe(200);
      expect(logoutTrigger).toHaveBeenCalled();
      expect(clearTokens).toHaveBeenCalled();
    });
  });

  describe('change profile data', () => {
    it('should change profile data', async () => {
      const changeProfileDataTrigger = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({
          success: true,
          user: {
            name: 'Ivan',
            email: 'ivanivanovich@gmail.com',
          },
        }),
      });

      (useChangeProfileMutation as jest.Mock).mockReturnValue([
        changeProfileDataTrigger,
        { isLoading: false, error: null },
      ]);

      const { changeProfileCredentials } = useProfile();

      const result = await changeProfileCredentials(mockData);

      expect(result.status).toBe(200);
      expect(result.data).toEqual({ success: true, user: mockUserCredentials });
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

      const { resetPass } = useResetPassword();

      const result = await resetPass('refresh', 'new_pass');

      expect(result.status).toBe(200);
      expect(result.data).toEqual({
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

      const { restorePass } = useRestorePassword();

      const result = await restorePass('ivanov@gmail.com');

      expect(result.status).toBe(200);
      expect(result.data).toEqual({
        success: true,
        message: 'email sent',
      });
      expect(restorePasswordTrigger).toHaveBeenCalledWith('ivanov@gmail.com');
    });
  });
});
