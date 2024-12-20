import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { ReactNode, useEffect, useRef } from 'react';
import ModalOverlay from './modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

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
  const paddingSize = size === 'M' ? 10 : 30;
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay>
      <div
        ref={modalRef}
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
    </ModalOverlay>
  );

  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export { Modal };
