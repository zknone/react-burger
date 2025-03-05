import { FC, ReactNode } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className={`${styles.content_container} pt-10`}>{children}</main>
    </>
  );
};

export default Layout;
