import { useDrag } from 'react-dnd';
import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';

const IngredientItem = ({
  ingredient,
  onClick,
}: {
  ingredient: IngredientType;
  onClick: () => void;
}) => {
  const quantity = 1;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id, ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      className={styles.ingredient_item_container}
      onClick={onClick}
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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
