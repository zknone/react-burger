import { useState } from 'react';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { useLogout } from '../../utils/api';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const { logoutUser } = useLogout();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logoutUser();
    console.log('разлогинился');
  };

  return (
    <div className={styles.container}>
      <div>
        <button>Профиль</button>
        <button>История заказов</button>
        <button onClick={handleLogout}>Выход</button>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form className={styles.form}>
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
