import { useState } from 'react';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './restore-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRestorePassword } from '../../utils/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/types';

export default function RestorePasswordPage() {
  const [email, setEmail] = useState('');
  const { restorePass, isLoading, error } = useRestorePassword();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await restorePass(email);
    if (response.data.success) {
      navigate('/reset-password');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <EmailInput
          placeholder="E-mail"
          name="e-mail"
          value={email}
          onChange={handleChange}
        />
        <Button disabled={isLoading} htmlType="submit">
          Восстановить
        </Button>
        {error && 'data' in error && (
          <p>
            {(error as FetchBaseQueryError & { data?: ErrorType['data'] }).data
              ?.message || 'Ошибка восстановления пароля'}
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
