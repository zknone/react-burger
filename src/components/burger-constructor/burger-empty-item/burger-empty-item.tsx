import { FC } from 'react';
import styles from './burger-empty-item.module.css';

type BurgerEmptyItemProps = {
  type?: 'top' | 'bottom';
  title: string;
};

const BurgerEmptyItem: FC<BurgerEmptyItemProps> = ({
  type = undefined,
  title,
}) => {
  return (
    <div
      className={`${styles.burger_item} ${type === 'top' && styles.burger_item_top} ${type === 'bottom' && styles.burger_item_bottom} mr-4`}
    >
      <span className="text text_type_main-default">{title}</span>
    </div>
  );
};

export default BurgerEmptyItem;
