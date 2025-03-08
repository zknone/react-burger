import { FC } from 'react';
// import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import styles from './order-item.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType, Order } from '../../types/types';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import { STATUSES } from '../../consts';

type IngredientCacheType = {
  [key: string]: IngredientType;
};

const OrderItem: FC<Order> = ({
  ingredients,
  status,
  number,
  createdAt,
  isOrderHistoryItem = false,
  name,
}) => {
  const { data } = useGetIngredientsQuery(undefined);

  const ingredientsData = data?.data;

  if (!ingredientsData) {
    return <p>Загрузка ингредиентов...</p>;
  }

  const ingredientsCache: IngredientCacheType = ingredientsData?.reduce(
    (acc: IngredientCacheType, value: IngredientType) => {
      acc[value._id] = value;
      return acc;
    },
    {}
  );

  const orderSum = ingredients.reduce((acc, item) => {
    return acc + ingredientsCache[item].price;
  }, 0);

  return (
    <li className={styles.container}>
      <div className={styles.titleWrapper}>
        <span className="text text_type_main-default">#{number}</span>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(createdAt)}
        />
      </div>
      <h3 className="text text_type_main-medium">{name}</h3>
      {isOrderHistoryItem && (
        <span
          className="text text_type_main-default"
          style={{ color: STATUSES[status].color }}
        >
          {STATUSES[status].title}
        </span>
      )}
      <div className={styles.ingredientsWrapper}>
        <ul className={styles.ingredientsList}>
          {ingredients.slice(0, 5).map((item, index) => (
            <li
              key={index}
              className={styles.ingredientListItem}
              style={{
                zIndex: ingredients.length - index,
                marginLeft: index === 0 ? '0' : '-24px',
              }}
            >
              <div className={styles.imgBackground}>
                {index < 4 ? (
                  <img
                    className={styles.img}
                    src={ingredientsCache[item]?.image_mobile}
                    alt={ingredientsCache[item].name}
                    loading="lazy"
                  />
                ) : (
                  <span>{`+${ingredients.length - index}`}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.priceWrapper}>
          <span className="text text_type_digits-default">{orderSum}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
