import {
  Button,
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const AppHeader = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<'main' | 'feed' | 'account'>('main');
  return (
    <header className={`${styles.menuWrapper} pt-4 pb-4`}>
      <div className={styles.menuBackground}></div>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Button
              extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`}
              type="secondary"
              htmlType="button"
              onClick={() => {
                setPage('main');
                navigate('/');
              }}
            >
              <BurgerIcon type={page === 'main' ? 'primary' : 'secondary'} />
              <span style={page === 'main' ? { color: 'white' } : {}}>
                Constructor
              </span>
            </Button>
          </li>
          <li className={styles.menuItem}>
            <Button
              extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`}
              type="secondary"
              htmlType="button"
              onClick={() => {
                setPage('feed');
                navigate('/feed');
              }}
            >
              <ListIcon type={page === 'feed' ? 'primary' : 'secondary'} />{' '}
              <span style={page === 'feed' ? { color: 'white' } : {}}>
                {' '}
                Order feed
              </span>
            </Button>
          </li>
        </ul>
      </nav>
      <Logo className={styles.logo} />
      <Button
        extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`}
        type="secondary"
        htmlType="button"
        onClick={() => {
          setPage('account');
          navigate('/login');
        }}
      >
        <ProfileIcon type={page === 'account' ? 'primary' : 'secondary'} />
        My Account
      </Button>
    </header>
  );
};

export { AppHeader };
