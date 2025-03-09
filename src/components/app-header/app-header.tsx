import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className={`${styles.menu_wrapper} pt-4 pb-4`}>
      <div className={styles.menu_background}></div>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menu_item}>
            <NavLink
              className={`${styles.menu_button} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`}
              to="/"
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.menu_button_active : ''}>
                    Constructor
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className={styles.menu_item}>
            <NavLink
              className={`${styles.menu_button} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`}
              to="/feed"
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.menu_button_active : ''}>
                    Order feed
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Logo className={styles.logo} />
      <NavLink
        className={`${styles.menu_button} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`}
        to="/profile"
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <span className={isActive ? styles.menu_button_active : ''}>
              My Account
            </span>
          </>
        )}
      </NavLink>
    </header>
  );
};

export { AppHeader };
