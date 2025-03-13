import { useDrag } from 'react-dnd';
import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../../utils/typed-hooks';

type QuantityType = {
  [x: string]: number;
};

type IngredientItemProps = { ingredient: IngredientType };

const IngredientItem: FC<IngredientItemProps> = ({ ingredient }) => {
  const { bun, selectedIngredients } = useTypedSelector(
    (state) => state.burgerConstructor
  );

  const location = useLocation();

  const ingredients = useMemo(
    () => [bun, ...selectedIngredients],
    [bun, selectedIngredients]
  );

  const quantity = useMemo(() => {
    return ingredients.reduce(
      (acc: QuantityType, item: IngredientType | null) => {
        if (item) {
          acc[item._id] = (acc[item._id] || 0) + 1;
        }
        return acc;
      },
      {}
    );
  }, [ingredients]);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      className={styles.ingredient_item}
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ backgroundLocation: location }}
        className={styles.ingredient_item_container}
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
      </Link>
    </li>
  );
};

export { IngredientItem };
