import { useState } from 'react';
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useTokenMutation,
} from '../services/api/authorization-api/authorization-api';

const useRegister = () => {
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (form: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await register(form).unwrap();
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      if (response.success) {
        await login({ email: form.email, password: form.password }).unwrap();
      }
    } catch (err) {
      setError('Ошибка регистрации');
      console.error(err);
    }
  };

  return { registerUser, isRegisterLoading, isLoginLoading, error };
};

const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (form: { email: string; password: string }) => {
    try {
      const response = await login(form).unwrap();
      if (response.success) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        console.log('login', response);
      }
    } catch (error) {
      setError('Ошибка логирования');
      console.log(error);
    }
  };

  return { loginUser, isLoading, error };
};

const useToken = () => {
  const [token] = useTokenMutation();
  const refreshToken = localStorage.getItem('refreshToken');

  const getNewToken = () => {
    if (!refreshToken) return;
    token(refreshToken)
      .unwrap()
      .then((data) => {
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      });
  };

  return { getNewToken };
};

const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const [error, setError] = useState<string | null>(null);

  const logoutUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
    try {
      await logout(refreshToken);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    } catch (error) {
      setError('Ошибка разлогирования');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    }
  };

  return { logoutUser, isLoading, error };
};

export { useRegister, useLogin, useToken, useLogout };
