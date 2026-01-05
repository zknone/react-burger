import { useParams } from 'react-router-dom';
import styles from './ingredient-popup-details.module.css';
import { useGetIngredientsQuery } from '../../../services/api/ingredients-api/ingredients-api';
import { IngredientType } from '../../../types/types';
import Loader from '../../loader/loader';

const IngredientPopupDetails = () => {
  const { id } = useParams();

  const {
    data: { data: ingredients } = { data: [] },
    isLoading,
    error,
  } = useGetIngredientsQuery(undefined);

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading ingredients</div>;

  const selectedIngredient = ingredients?.find(
    (item: IngredientType) => item._id === id
  );

  if (!selectedIngredient) return <div>Ingredient not found</div>;

  return (
    <div className={styles.burger_popup_container}>
      <img
        className="mb-4"
        width={480}
        height={240}
        src={selectedIngredient.image_large}
        alt="Ingredient"
      />
      <p
        className={`${styles.burger_popup_text} text text_type_main-medium mb-6`}
      >
        {selectedIngredient.name}
      </p>
      <dl className={styles.burger_popup_details}>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {selectedIngredient.calories}
          </dd>
        </div>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {selectedIngredient.proteins}
          </dd>
        </div>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {selectedIngredient.fat}
          </dd>
        </div>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {selectedIngredient.carbohydrates}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export { IngredientPopupDetails };
