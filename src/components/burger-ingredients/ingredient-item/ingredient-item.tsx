import { useDrag } from 'react-dnd';
import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

type QuantityType = Record<string, number>;

const IngredientItem = ({
  ingredient,
  onClick,
}: {
  ingredient: IngredientType;
  onClick: () => void;
}) => {
  const { bun, selectedIngredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const ingredients = [bun, ...selectedIngredients];

  type QuantityType = {
    [x: string]: number;
  };

  const quantity: QuantityType = ingredients.reduce(
    (acc: QuantityType, item: IngredientType | null) => {
      if (item) {
        acc[item._id] = (acc[item._id] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
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
      {quantity[ingredient._id] && (
        <div
          className={`${styles.ingredient_quantity_number} text text_type_digits-default`}
        >
          {quantity[ingredient._id]}
        </div>
      )}
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
