import { ReactNode } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children }: { children: ReactNode }) => {
  return <div className={styles.modal_overlay}>{children}</div>;
};

export default ModalOverlay;
