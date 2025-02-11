import { useState } from 'react';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { useLogout } from '../../utils/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.profile.user);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });

  const { logoutUser } = useLogout();

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logoutUser();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <NavLink
          to="/profile"
          className={(isActive) =>
            isActive
              ? `${styles.link} ${styles.link__active} text text_type_main-default`
              : `${styles.link} text text_type_main-default`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.link__active} text text_type_main-default`
              : `${styles.link} text text_type_main-default`
          }
        >
          История заказов
        </NavLink>
        <button
          className={`${styles.exit_button} text text_type_main-default`}
          onClick={handleLogout}
        >
          Выход
        </button>
        <p className={`${styles.disclaimer} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <Input
          disabled
          type="text"
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={handleChange}
          icon={'EditIcon'}
        />
        <EmailInput
          disabled
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          isIcon
        />
        <PasswordInput
          disabled
          placeholder="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          icon={'EditIcon'}
        />
      </form>
    </div>
  );
}
