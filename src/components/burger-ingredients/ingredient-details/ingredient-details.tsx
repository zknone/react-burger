import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({
  price,
  title,
}: {
  price: number;
  title: string;
}) => {
  return (
    <>
      <p
        className={`${styles.ingredient_details_description} text text_type_digits-default`}
      >
        {price} <CurrencyIcon type="primary" />
      </p>
      <p
        className={`${styles.ingredient_details_description} text text_type_main-default`}
      >
        {title}
      </p>
    </>
  );
};

export { IngredientDetails };
