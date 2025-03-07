import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useProfile } from '../../utils/api';
import { useForm } from '../../utils/useForm';
import { useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import { RootState } from '../../store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/types';
import styles from './profile-form.module.css';

const ProfileForm = () => {
  const user = useSelector((state: RootState) => state.profile.user);
  const initialForm = { name: user.name, email: user.email, password: '' };
  const { form, handleChange, resetForm } = useForm(initialForm);

  const [savedForm] = useState(initialForm);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changeProfileCredentials(form);
  };

  const handleReset = async () => {
    resetForm();
    await changeProfileCredentials(savedForm);
  };

  const { changeProfileCredentials, error, isLoading, isSuccess } =
    useProfile();

  return (
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
      <Button
        disabled={isLoading}
        htmlType="reset"
        type="secondary"
        onClick={handleReset}
      >
        Отменить
      </Button>
      <Button disabled={isLoading} htmlType="submit">
        Сохранить
      </Button>
      {isSuccess && <p>Данные успешно изменены</p>}
      {error && 'data' in error && (
        <p>
          {(error as FetchBaseQueryError & { data?: ErrorType['data'] }).data
            ?.message || 'Ошибка изменения пароля, имени или почтового адреса'}
        </p>
      )}
    </form>
  );
};

export default ProfileForm;
