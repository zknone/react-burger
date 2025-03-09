import { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

type ModalOverlayProps = { children: ReactNode };

const ModalOverlay: FC<ModalOverlayProps> = ({ children }) => {
  return <div className={styles.modal_overlay}>{children}</div>;
};

export default ModalOverlay;
