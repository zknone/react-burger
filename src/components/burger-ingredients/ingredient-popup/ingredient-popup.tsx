import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-popup.module.css';
import mockMeat from '../../../assets/meat-mock.png';
import { IngredientPopupDetails } from '../ingredient-popup-details/ingredient-popup-details';

const ingredientDetails = [
  {
    title: 'Калории,ккал',
    value: '244,4',
  },
  {
    title: 'Белки, г',
    value: '12,2',
  },
  {
    title: 'Жиры, г',
    value: '17,2',
  },
  {
    title: 'Углеводы, г',
    value: '10,2',
  },
];

const IngredientPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popup_overlay} onClick={onClose}>
      <div
        className={`${styles.popup_container} pt-10 pb-10 pr-10 pl-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.popup_header_wrapper} mb-8`}>
          <h2 className={`${styles.popup_title} text text_type_main-large`}>
            Детали ингредиента
          </h2>
          <button className={`${styles.popup_close_button}`} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>

        <img
          className="mb-4"
          width={480}
          height={240}
          src={mockMeat}
          alt="Заказ исполнен"
        />
        <p className="text text_type_main-medium mb-15">
          Биокотлета из марсианской Магнолии
        </p>
        <ul className={styles.popup_details}>
          {ingredientDetails.map((item) => (
            <IngredientPopupDetails value={item.value} title={item.title} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { IngredientPopup };
