import { useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { useLogout, useProfile } from '../../utils/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/types';

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.profile.user);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });

  const { logoutUser } = useLogout();
  const { changeProfileCredentials, error, isLoading } = useProfile();

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logoutUser();
    navigate('/');
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await changeProfileCredentials(form);
    } catch (err) {
      console.log('ошибка измненения данных', err);
    }
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={handleChange}
          icon={'EditIcon'}
        />
        <EmailInput
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          isIcon
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          icon={'EditIcon'}
        />
        <Button disabled={form.password === '' || isLoading} htmlType="submit">
          Сохранить
        </Button>
        {error && 'data' in error && (
          <p>
            {(error as FetchBaseQueryError & { data?: ErrorType['data'] }).data
              ?.message ||
              'Ошибка измненения пароль, имени или почтового адреса'}
          </p>
        )}
      </form>
    </div>
  );
}
