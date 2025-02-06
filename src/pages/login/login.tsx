import { useState } from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../services/api/authorization-api/authorization-api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isError, isLoading }] = useLoginMutation();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (error) {
      console.log(error);
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
        {isError && <p>Введен неправильный email и пароль</p>}
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
