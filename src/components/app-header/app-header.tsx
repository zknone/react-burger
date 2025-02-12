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
    <header className={`${styles.menuWrapper} pt-4 pb-4`}>
      <div className={styles.menuBackground}></div>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink
              className={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`}
              to="/"
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.menuButtonActive : ''}>
                    Constructor
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink
              className={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`}
              to="/feed"
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.menuButtonActive : ''}>
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
        className={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`}
        to="/profile"
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <span className={isActive ? styles.menuButtonActive : ''}>
              My Account
            </span>
          </>
        )}
      </NavLink>
    </header>
  );
};

export { AppHeader };
