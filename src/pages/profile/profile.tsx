import { useState } from 'react';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div>
        <button>Профиль</button>
        <button>История заказов</button>
        <button>Выход</button>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
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
      </form>
    </div>
  );
}
