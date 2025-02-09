import { useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
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

export { useRegister, useLogin };
