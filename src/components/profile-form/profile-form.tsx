import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useProfile } from '../../utils/api-hooks';
import { useForm } from '../../hooks/use-form';
import { FormEvent, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/types';
import styles from './profile-form.module.css';
import { useTypedSelector } from '../../utils/typed-hooks';

const ProfileForm = () => {
  const user = useTypedSelector((state) => state.profile.user);
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
        placeholder="Name"
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
        placeholder="Password"
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
        Cancel
      </Button>
      <Button disabled={isLoading} htmlType="submit">
        Save
      </Button>
      {isSuccess && <p>Profile updated successfully</p>}
      {error && 'data' in error && (
        <p>
          {(error as FetchBaseQueryError & { data?: ErrorType['data'] }).data
            ?.message || 'Failed to update password, name, or email address'}
        </p>
      )}
    </form>
  );
};

export default ProfileForm;
