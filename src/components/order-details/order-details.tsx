import { useParams } from 'react-router-dom';
import { STATUSES } from '../../consts';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import {
  CountedIngredientCacheType,
  IngredientType,
  Order,
} from '../../types/types';
import styles from './order-details.module.css';

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { RootState } from '../../store';
import Loader from '../loader/laoder';

type OrderDetailsProps = {
  isPrivateOrders?: boolean;
};

const OrderDetails: FC<OrderDetailsProps> = ({ isPrivateOrders = false }) => {
  const { data } = useGetIngredientsQuery(undefined);
  const { id } = useParams();

  const socketData = useSelector((state: RootState) => state.socket);

  const ingredientsData = data?.data;
  const ordersData = isPrivateOrders ? socketData.privateData : socketData.data;

  const order = ordersData?.orders?.find((item: Order) => item._id === id);

  if (!order) {
    return <Loader />;
  }

  const ingredientsCache: CountedIngredientCacheType = ingredientsData?.reduce(
    (acc: CountedIngredientCacheType, value: IngredientType) => {
      acc[value._id] = { value: value, count: 0 };
      return acc;
    },
    {}
  );

  order?.ingredients.map((item) => {
    ingredientsCache[item].count += 1;
  });

  const parsedIngredients = Object.values(ingredientsCache)
    .filter((item) => item.count !== 0)
    .sort((a, b) => b.count - a.count);

  const orderSum = parsedIngredients.reduce((acc, item) => {
    return acc + item.value.price;
  }, 0);

  return (
    <>
      <span className="text text_type_digits-default mb-10">
        #{order.number}
      </span>

      <h3 className={`text text_type_main-medium mb-3 ${styles.title}`}>
        {order.name}
      </h3>
      <span
        className={`text text_type_main-default mb-15 ${styles.status}`}
        style={{ color: STATUSES[order.status].color }}
      >
        {STATUSES[order.status].title}
      </span>
      <h3 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Состав:{' '}
      </h3>

      <ul className={styles.ingredients_list}>
        {parsedIngredients.map((item, index) => (
          <li key={index} className={styles.ingredient_list_item}>
            <div className={styles.ingredient_description}>
              <div className={styles.img_background}>
                <div className={styles.img_container}>
                  <img
                    className={styles.img}
                    src={item.value.image_mobile}
                    alt={item.value.name}
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text text_type_main-default">
                {item.value.name}
              </span>
            </div>

            <span className={styles.price}>
              {item.count} X {item.value.price} <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
        <div className={styles.price_wrapper}>
          <span className="text text_type_digits-default">{orderSum}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
