import { useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './restore-password.module.css';
import { Link } from 'react-router-dom';
import { useResetPassword } from '../../utils/api';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ token: '', password: '' });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { resetPass, error, isLoading } = useResetPassword();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    resetPass(form.token, form.password);
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
        <Button disabled={isLoading} htmlType="submit" onClick={handleSubmit}>
          Восстановить
        </Button>
        {error && <div>{error}</div>}
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
