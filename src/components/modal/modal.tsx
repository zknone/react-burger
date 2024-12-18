import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { ReactNode } from 'react';

const Modal = ({
  title,
  size = 'M',
  children,
  isOpen,
  onClose,
}: {
  title?: string;
  size?: 'M' | 'L';
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const paddingSize = size === 'M' ? 10 : 30;

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        style={{ width: size === 'M' ? '640px' : '480px' }}
        className={`${styles.modal_container} pt-${paddingSize} pb-${paddingSize} pr-${paddingSize} pl-${paddingSize}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={`${styles.modal_header_wrapper} mb-8`}>
            <h2 className={`${styles.modal_title} text text_type_main-large`}>
              {title}
            </h2>
          </div>
        )}
        <button className={`${styles.modal_close_button}`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
