import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-popup.module.css';
import done from '../../../assets/done.png';

const BurgerPopup = ({
  orderNumber,
  isOpen,
  onClose,
}: {
  orderNumber: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popup_overlay} onClick={onClose}>
      <div
        className={`${styles.popup_container} pt-30 pb-30 pr-30 pl-30`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={`${styles.popup_close_button}`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img
          className="mb-15"
          width={120}
          height={120}
          src={done}
          alt="Заказ исполнен"
        />
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default" style={{ color: '#8585AD' }}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

export { BurgerPopup };
