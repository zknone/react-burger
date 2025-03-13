import styles from './profile.module.css';
import { useLogout } from '../../utils/api';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileForm from '../../components/profile-form/profile-form';
import OrderHistory from '../../components/order-history/order-history';

export default function ProfilePage() {
  const { logoutUser } = useLogout();

  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logoutUser();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.link__active} text text_type_main-default`
              : `${styles.link} text text_type_main-default`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
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

      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}
