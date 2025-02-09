import { useParams } from 'react-router-dom';
import { IngredientPopupDetails } from '../../components/burger-ingredients/ingredient-popup-details/ingredient-popup-details';
import styles from './ingredient.module.css';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import { IngredientType } from '../../types/types';

export default function IngredientPage() {
  const { id } = useParams();

  const { data } = useGetIngredientsQuery(undefined);
  const ingredients: IngredientType[] = data?.data;

  const foundIngredient = ingredients.filter((item) => item._id === id)[0];

  return (
    <div className={styles.container}>
      <h2 className={`${styles.modal_title} text text_type_main-large`}>
        {foundIngredient.name}
      </h2>
      <IngredientPopupDetails
        img={foundIngredient.image_large}
        protein={foundIngredient.proteins}
        calories={foundIngredient.calories}
        carbs={foundIngredient.carbohydrates}
        fat={foundIngredient.fat}
      />
    </div>
  );
}
