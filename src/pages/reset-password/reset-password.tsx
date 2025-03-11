import { SyntheticEvent, useEffect } from 'react';
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
import { useForm } from '../../utils/use-form';
import { useTypedSelector } from '../../utils/typed-hooks';

export default function ResetPasswordPage() {
  const { form, handleChange } = useForm({ password: '', token: '' });
  const canResetPassword = useTypedSelector(
    (state) => state.profile.canResetPassword
  );

  const { resetPass, error, isLoading } = useResetPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await resetPass(form.token, form.password);
    if (response.data.success) {
      navigate('/login');
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
