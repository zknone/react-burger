import styles from './burger-empty-item.module.css';

export default function BurgerEmptyItem({
  type = undefined,
  title,
}: {
  type?: 'top' | 'bottom';
  title: string;
}) {
  return (
    <div
      className={`${styles.burger_item} ${type === 'top' && styles.burger_item_top} ${type === 'bottom' && styles.burger_item_bottom} mr-4`}
    >
      <span className="text text_type_main-default">{title}</span>
    </div>
  );
}
