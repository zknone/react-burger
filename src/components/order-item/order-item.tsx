import { FC } from 'react';
import styles from './order-item.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCacheType, IngredientType, Order } from '../../types/types';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import { STATUSES } from '../../consts';
import { Link, useLocation } from 'react-router-dom';

const LAST_INDEX_TO_SHOW = 4;

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
  const location = useLocation();

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

  if (!ingredientsCache || Object.keys(ingredientsCache).length === 0) {
    return <p>Проверка кэша...</p>;
  }

  const orderSum = ingredients.reduce((acc, item) => {
    const ingredient = ingredientsCache[item];

    if (!ingredient) {
      console.warn(`Нет данных в кэше для ингредиента: ${item}`);
      return acc;
    }

    return acc + (ingredient.price ?? 0);
  }, 0);

  return (
    <li className={styles.container}>
      <Link
        to={number.toString()}
        state={{ backgroundLocation: location }}
        className={styles.link}
      >
        <div className={styles.title_wrapper}>
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
        <div className={styles.ingredients_wrapper}>
          <ul className={styles.ingredients_list}>
            {ingredients.slice(0, 5).map((item, index) => {
              const ingredient = ingredientsCache[item];
              if (!ingredient) {
                console.warn(`Нет данных для ингредиента: ${item}`);
                return null;
              }

              return (
                <li
                  key={index}
                  className={styles.ingredient_list_item}
                  style={{
                    zIndex: LAST_INDEX_TO_SHOW - index,
                    marginLeft: index === 0 ? '-5px' : '-24px',
                  }}
                >
                  <div className={styles.img_background}>
                    {index < LAST_INDEX_TO_SHOW ? (
                      <img
                        className={styles.img}
                        src={ingredient.image_mobile}
                        alt={ingredient.name}
                        loading="lazy"
                      />
                    ) : (
                      <span>{`+${ingredients.length - index}`}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.price_wrapper}>
            <span className="text text_type_digits-default">{orderSum}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderItem;
