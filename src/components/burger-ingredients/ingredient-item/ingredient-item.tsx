import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import firstBun from '../../../assets/bun-01.png';
import secondBun from '../../../assets/bun-02.png';
import firstSauce from '../../../assets/sauce-01.png';
import secondSauce from '../../../assets/sauce-01.png';
import thirdSauce from '../../../assets/sauce-01.png';
import fourthSauce from '../../../assets/sauce-01.png';
import { IngredientPopup } from '../ingredient-popup/ingredient-popup';
import { useState } from 'react';

const images: Record<string, string> = {
  firstBun: firstBun,
  secondBun: secondBun,
  firstSauce: firstSauce,
  secondSauce: secondSauce,
  thirdSauce: thirdSauce,
  fourthSauce: fourthSauce,
};

const IngredientItem = ({
  title,
  price,
  image,
  quantity = 0,
}: IngredientType) => {
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
      {quantity !== 0 && (
        <div
          className={`${styles.ingredient_quantity_number} text text_type_digits-default`}
        >
          {quantity}
        </div>
      )}
      <img
        className={`${styles.ingredient_item_image} pl-4 pr-4 pb-1`}
        alt={title}
        src={images[image]}
      />
      <IngredientDetails title={title} price={price} />
    </li>
  );
};

export { IngredientItem };
