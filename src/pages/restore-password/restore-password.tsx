import { useState } from 'react';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './restore-password.module.css';
import { Link } from 'react-router-dom';
import { useRestorePassword } from '../../utils/api';

export default function RestorePasswordPage() {
  const [email, setEmail] = useState('');
  const { restorePass, isLoading, error } = useRestorePassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    restorePass(email);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.modal_title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <EmailInput
          placeholder="E-mail"
          name="e-mail"
          value={email}
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
