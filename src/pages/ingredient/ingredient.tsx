import { useParams } from 'react-router-dom';
import { IngredientPopupDetails } from '../../components/burger-ingredients/ingredient-popup-details/ingredient-popup-details';
import styles from './ingredient.module.css';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import { IngredientType } from '../../types/types';

export default function IngredientPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useGetIngredientsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading ingredients</div>;

  const ingredients: IngredientType[] = data?.data || [];

  const foundIngredient = ingredients.find((item) => item._id === id);

  if (!foundIngredient) {
    return <div>Ingredient not found</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.modal_title} text text_type_main-large`}>
        {foundIngredient.name}
      </h2>
      <IngredientPopupDetails />
    </div>
  );
}
