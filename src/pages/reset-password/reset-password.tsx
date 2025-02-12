import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../utils/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: '', token: '' });
  const canResetPassword = useSelector(
    (state: RootState) => state.profile.canResetPassword
  );

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { resetPass, error, isLoading } = useResetPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await resetPass(form.token, form.password);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!canResetPassword) navigate('/forgot-password');
  }, [canResetPassword, navigate]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={form.token}
          onChange={handleChange}
        />
        <Button disabled={isLoading} htmlType="submit" onClick={handleSubmit}>
          Восстановить
        </Button>
        {error && 'data' in error && (
          <p>
            {(error as FetchBaseQueryError & { data?: ErrorType['data'] }).data
              ?.message || 'Ошибка сброса пароля'}
          </p>
        )}
      </form>
      <div className={styles.line}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link
          className={`${styles.link} text text_type_main-default text`}
          to="/login"
        >
          Войти
        </Link>
      </div>
    </div>
  );
}
