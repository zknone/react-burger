import { useParams } from 'react-router-dom';
import { IngredientPopupDetails } from '../../components/burger-ingredients/ingredient-popup-details/ingredient-popup-details';
import styles from './ingredient.module.css';

export default function IngredientPage() {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h2 className={`${styles.modal_title} text text_type_main-large`}>
        Заголовок {id}
      </h2>
      <IngredientPopupDetails
        img=""
        protein={20}
        calories={20}
        carbs={20}
        fat={20}
      />
    </div>
  );
}
