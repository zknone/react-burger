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
import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect } from 'react';
import { RootState } from '../../store';
import Loader from '../loader/laoder';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';
import { useGetOrderQuery } from '../../services/api/order-api/order-api';

type OrderDetailsProps = {
  isPrivateOrders?: boolean;
};

const OrderDetails: FC<OrderDetailsProps> = ({ isPrivateOrders = false }) => {
  const { data } = useGetIngredientsQuery(undefined);
  const params = useParams();
  const { number } = params;

  console.log(number);
  const parsedNumber = number ? Number.parseInt(number) : undefined;
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrderQuery(parsedNumber);
  const dispatch = useDispatch();

  const socketData = useSelector((state: RootState) => state.socket);

  const ingredientsData = data?.data;
  const ordersData = isPrivateOrders ? socketData.privateData : socketData.data;

  const order = socketData.isSocketOpen
    ? ordersData?.orders?.find((item: Order) => item.number === parsedNumber)
    : orderData;

  useEffect(() => {
    dispatch(startSocket());

    return () => {
      dispatch(stopSocket());
    };
  }, [dispatch]);

  if (socketData.isLoading || !socketData.isSocketOpen || !data || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading order details</div>;
  }

  if (!order) {
    return <div>No order data found. May be this data is private</div>;
  }

  const ingredientsCache: CountedIngredientCacheType = ingredientsData?.reduce(
    (acc: CountedIngredientCacheType, value: IngredientType) => {
      acc[value._id] = { value: value, count: 0 };
      return acc;
    },
    {}
  );

  order?.ingredients.map((item: string) => {
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
        style={{ color: STATUSES[order.status as keyof typeof STATUSES].color }}
      >
        {STATUSES[order.status as keyof typeof STATUSES].title}
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
