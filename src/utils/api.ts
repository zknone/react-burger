import {
  useChangeProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useRestorePasswordMutation,
} from '../services/api/authorization-api/authorization-api';
import { useDispatch } from 'react-redux';
import {
  resetProfile,
  setCanResetPassword,
  setProfile,
} from '../services/slices/profile/reducers';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../types/types';

const useRegister = () => {
  const [register, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterMutation();
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const registerUser = async (form: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await register(form).unwrap();

      if (response.success) {
        const loginResponse = await login({
          email: form.email,
          password: form.password,
        }).unwrap();
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('refreshToken', loginResponse.refreshToken);
      }

      return { status: 200, data: response };
    } catch (err) {
      const typedError = err as FetchBaseQueryError & {
        data?: ErrorType['data'];
      };
      return {
        status: typedError.status || 500,
        data: {
          success: false,
          message: typedError.data?.message || 'Ошибка регистрации',
        },
      };
    }
  };

  return {
    registerUser,
    isRegisterLoading,
    isLoginLoading,
    registerError,
    loginError,
  };
};

const useLogin = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const loginUser = async (form: { email: string; password: string }) => {
    try {
      const response = await login(form).unwrap();
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      if (response.success) dispatch(setProfile(response));

      return { status: 200, data: response };
    } catch (err) {
      console.error('Ошибка входа:', err);

      const typedError = err as FetchBaseQueryError & {
        data?: ErrorType['data'];
      };

      return {
        status: typedError.status || 500,
        data: {
          success: false,
          message: typedError.data?.message || 'Ошибка входа',
        },
      };
    }
  };

  return { loginUser, isLoading, error };
};

const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
    try {
      await logout(refreshToken);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      dispatch(resetProfile());

      return { status: 200, data: { success: true } };
    } catch (err) {
      const typedError = err as FetchBaseQueryError & {
        data?: ErrorType['data'];
      };
      return {
        status: typedError.status || 500,
        data: {
          success: false,
          message: typedError.data?.message || 'Ошибка разлогирования',
        },
      };
    }
  };

  return { logoutUser, isLoading };
};

const useResetPassword = () => {
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const dispatch = useDispatch();

  const resetPass = async (token: string, newPassword: string) => {
    try {
      const response = await resetPassword({
        token,
        password: newPassword,
      }).unwrap();

      if (response.success) {
        dispatch(setCanResetPassword(false));
      }
      return { status: 200, data: { success: true } };
    } catch (err) {
      const typedError = err as FetchBaseQueryError & {
        data?: ErrorType['data'];
      };
      return {
        status: typedError.status || 500,
        data: {
          success: false,
          message: typedError.data?.message || 'Не смог обновить пароль',
        },
      };
    }
  };

  return { resetPass, isLoading, error };
};

const useRestorePassword = () => {
  const [restorePassword, { isLoading, error }] = useRestorePasswordMutation();
  const dispatch = useDispatch();

  const restorePass = async (email: string) => {
    try {
      const response = await restorePassword(email).unwrap();
      if (response.success) {
        dispatch(setCanResetPassword(true));
      }
      return { status: 200, data: { success: true } };
    } catch (err) {
      const typedError = err as FetchBaseQueryError & {
        data?: ErrorType['data'];
      };
      return {
        status: typedError.status || 500,
        data: {
          success: false,
          message:
            typedError.data?.message ||
            'Ошибка восстановления пароля по этому email',
        },
      };
    }
  };

  return { restorePass, isLoading, error };
};

const useProfile = () => {
  const [changeProfile, { isLoading, error, isSuccess }] =
    useChangeProfileMutation();
  const dispatch = useDispatch();

  const changeProfileCredentials = async (form: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await changeProfile(form).unwrap();

      if (response.success) dispatch(setProfile(response));

      return { status: 200, data: response };
    } catch (err) {
      const typedError = err as FetchBaseQueryError & {
        data?: ErrorType['data'];
      };
      return {
        status: typedError.status || 500,
        data: {
          success: false,
          message: typedError.data?.message || 'Ошибка регистрации',
        },
      };
    }
  };

  return { changeProfileCredentials, isLoading, error, isSuccess };
};

export {
  useRegister,
  useLogin,
  useLogout,
  useResetPassword,
  useRestorePassword,
  useProfile,
};
