import { useState } from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../utils/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/types';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { loginUser, isLoading, error } = useLogin();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(form);

    if (result.status === 200) {
      navigate('/profile');
    } else {
      console.error(result.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Вход
        </h2>
        <EmailInput
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button disabled={isLoading} htmlType="submit">
          Войти
        </Button>
        {error && 'data' in error && (
          <p>
            {(error as FetchBaseQueryError & { data?: ErrorType['data'] }).data
              ?.message || 'Ошибка входа'}
          </p>
        )}
      </form>
      <div className={styles.line}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </p>
        <Link
          className={`${styles.link} text text_type_main-default text`}
          to="/register"
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.line}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link
          className={`${styles.link} text text_type_main-default text`}
          to="/forgot-password"
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}
