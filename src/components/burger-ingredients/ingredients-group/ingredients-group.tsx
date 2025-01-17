import { forwardRef } from 'react';
import { IngredientType } from '../../../types/types';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';

const IngredientsGroup = forwardRef<
  HTMLDivElement,
  {
    title: string;
    ingredients: IngredientType[];
    handleIngredientSelected: (ingredient: IngredientType) => void;
  }
>(({ title, ingredients, handleIngredientSelected }, ref) => {
  return (
    <div>
      <h3 className="text text_type_main-medium mb-6" ref={ref}>
        {title}
      </h3>
      <ul className={styles.ingredients_group_container}>
        {ingredients.map((item) => (
          <IngredientItem
            key={item._id}
            ingredient={item}
            onClick={() => handleIngredientSelected(item)}
          />
        ))}
      </ul>
    </div>
  );
});

export { IngredientsGroup };
