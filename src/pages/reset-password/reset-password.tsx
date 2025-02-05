import { useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './restore-password.module.css';
import { Link } from 'react-router-dom';
import fetchData, { BASE_API_URL } from '../../utils/fetch-data';

type ResetPasswordResponse = {
  message: string;
  success: boolean;
};

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ token: '', password: '' });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleResetPassword = async (
    password: string,
    token: string
  ): Promise<ResetPasswordResponse> => {
    try {
      const res = await fetchData<ResetPasswordResponse>(
        `${BASE_API_URL}/password-reset/reset`,
        {
          method: 'POST',
          body: {
            password: password,
            token: token,
          },
        }
      );

      return res;
    } catch (error) {
      throw new Error(`Problems with restoring password: ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <EmailInput
          placeholder="Введите новый пароль"
          name="e-mail"
          value={form.password}
          onChange={handleChange}
        />
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={form.token}
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          onClick={() => handleResetPassword(form.password, form.token)}
        >
          Восстановить
        </Button>
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
