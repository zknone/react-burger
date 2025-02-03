import { IngredientPopupDetails } from '../../components/burger-ingredients/ingredient-popup-details/ingredient-popup-details';
import styles from './login.module.css';

export default function IngredientPage() {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.modal_title} text text_type_main-large`}>
        Заголовок
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
