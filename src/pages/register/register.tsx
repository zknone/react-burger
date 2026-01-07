import { FormEvent } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { useRegister } from '../../utils/api';
import { ErrorType } from '../../types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useForm } from '../../hooks/use-form';

export default function RegisterPage() {
  const { form, handleChange } = useForm({ name: '', email: '', password: '' });
  const {
    registerUser,
    isRegisterLoading,
    isLoginLoading,
    registerError,
    loginError,
  } = useRegister();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(form);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Sign up
        </h2>
        <Input
          type="text"
          placeholder="Name"
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
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button
          disabled={isRegisterLoading || isLoginLoading}
          htmlType="submit"
        >
          Sign up
        </Button>
        {registerError && 'data' in registerError && (
          <p>
            {(
              registerError as FetchBaseQueryError & {
                data?: ErrorType['data'];
              }
            ).data?.message || 'Registration failed'}
          </p>
        )}

        {loginError && 'data' in loginError && (
          <p>
            {(
              loginError as FetchBaseQueryError & {
                data?: ErrorType['data'];
              }
            ).data?.message || 'Login after registration failed'}
          </p>
        )}
      </form>
      <div className={styles.line}>
        <p className="text text_type_main-default text_color_inactive">
          Already registered?
        </p>
        <Link
          className={`${styles.link} text text_type_main-default text`}
          to="/login"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
