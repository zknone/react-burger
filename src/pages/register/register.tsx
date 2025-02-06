import { useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../services/api/authorization-api/authorization-api';

export default function RegisterPage() {
  const [register, { isLoading, data: registerResponse }] =
    useRegisterMutation();
  const [login] = useLoginMutation();

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await register(form).unwrap();
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      await login({ email: form.name, password: form.password });
    } catch (err) {
      console.log(err);
    }

    console.log(registerResponse);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Регистрация
        </h2>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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
      </form>
      <div className={styles.line}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
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
