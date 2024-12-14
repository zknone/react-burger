import { IngredientType } from '../../../types/types';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import firstBun from '../../../assets/bun-01.png';
import secondBun from '../../../assets/bun-02.png';
import firstSauce from '../../../assets/sauce-01.png';
import secondSauce from '../../../assets/sauce-01.png';
import thirdSauce from '../../../assets/sauce-01.png';
import fourthSauce from '../../../assets/sauce-01.png';

const images: Record<string, string> = {
  firstBun: firstBun,
  secondBun: secondBun,
  firstSauce: firstSauce,
  secondSauce: secondSauce,
  thirdSauce: thirdSauce,
  fourthSauce: fourthSauce,
};

const IngredientItem = ({ title, price, image }: IngredientType) => {
  return (
    <li className={styles.itemContainer}>
      <img
        className={`${styles.image} pl-4 pr-4 pb-1`}
        alt={title}
        src={images[image]}
      />
      <IngredientDetails title={title} price={price} />
    </li>
  );
};

export { IngredientItem };
