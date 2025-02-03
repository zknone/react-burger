import {
  Button,
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useNavigate } from 'react-router-dom';
const AppHeader = () => {
  const isActive = true;
  const navigate = useNavigate();
  return (
    <header className={`${styles.menuWrapper} pt-4 pb-4`}>
      <div className={styles.menuBackground}></div>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Button
              extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`}
              style={isActive && { color: 'white' }}
              type="secondary"
              htmlType="button"
              onClick={() => navigate('/')}
            >
              <BurgerIcon type="primary" />
              Constructor
            </Button>
          </li>
          <li className={styles.menuItem}>
            <Button
              extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`}
              type="secondary"
              htmlType="button"
              onClick={() => navigate('/feed')}
            >
              <ListIcon type="secondary" /> Order feed
            </Button>
          </li>
        </ul>
      </nav>
      <Logo className={styles.logo} />
      <Button
        extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`}
        type="secondary"
        htmlType="button"
        onClick={() => navigate('/login')}
      >
        <ProfileIcon type="secondary" />
        My Account
      </Button>
    </header>
  );
};

export { AppHeader };
