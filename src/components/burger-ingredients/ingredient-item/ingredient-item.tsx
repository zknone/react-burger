import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import { IngredientPopup } from '../ingredient-popup/ingredient-popup';
import { useState } from 'react';

const IngredientItem = ({ name, price, image }: IngredientType) => {
  const quantity = 1;
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  return (
    <li
      className={styles.ingredient_item_container}
      onClick={() => setPopupOpen(!isPopupOpen)}
    >
      <IngredientPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
      />
      <div
        className={`${styles.ingredient_quantity_number} text text_type_digits-default`}
      >
        {quantity}
      </div>
      <img
        className={`${styles.ingredient_item_image} pl-4 pr-4 pb-1`}
        alt={name}
        src={image}
      />
      <IngredientDetails title={name} price={price} />
    </li>
  );
};

export { IngredientItem };
