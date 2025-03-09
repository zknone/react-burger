import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import { FC } from 'react';

type IngredientDetailsProps = {
  price: number;
  title: string;
};

const IngredientDetails: FC<IngredientDetailsProps> = ({ price, title }) => {
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
