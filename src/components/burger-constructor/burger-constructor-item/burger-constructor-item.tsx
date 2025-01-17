import { useDrag, useDrop } from 'react-dnd';
import { IngredientType } from '../../../types/types';
import styles from './burger-constructor-item.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructorItem({
  ingredient,
  index,
  moveIngredient,
  handleClose,
}: {
  ingredient: IngredientType;
  index: number;
  handleClose: (index: number) => void;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredientToSort',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'ingredientToSort',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredient(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <li
      className={styles.burger_constructor_item}
      ref={(node) => dragRef(dropRef(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass="mr-4"
        text={ingredient?.name as string}
        thumbnail={ingredient?.image_mobile as string}
        price={ingredient?.price as number}
        handleClose={() => handleClose(index)}
      />
    </li>
  );
}
