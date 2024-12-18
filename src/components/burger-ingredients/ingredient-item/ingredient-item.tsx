import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import { useState } from 'react';
import { Modal } from '../../modal/modal';
import { IngredientPopupDetails } from '../ingredient-popup-details/ingredient-popup-details';

const IngredientItem = ({ ingredient }: { ingredient: IngredientType }) => {
  const quantity = 1;
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  return (
    <li
      className={styles.ingredient_item_container}
      onClick={() => setPopupOpen(!isPopupOpen)}
    >
      <Modal
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        title="Детали ингредиента"
      >
        <IngredientPopupDetails
          img={ingredient.image}
          protein={ingredient.proteins}
          calories={ingredient.calories}
          fat={ingredient.fat}
          carbs={ingredient.carbohydrates}
        />
      </Modal>
      <div
        className={`${styles.ingredient_quantity_number} text text_type_digits-default`}
      >
        {quantity}
      </div>
      <img
        className={`${styles.ingredient_item_image} pl-4 pr-4 pb-1`}
        alt={ingredient.name}
        src={ingredient.image}
      />
      <IngredientDetails title={ingredient.name} price={ingredient.price} />
    </li>
  );
};

export { IngredientItem };
