import { useParams } from 'react-router-dom';
import { STATUSES } from '../../consts';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import {
  CountedIngredientCacheType,
  IngredientType,
  Order,
} from '../../types/types';
import {
  convertEstimatedMinutesToSeconds,
  estimateCookingTimeMinutes,
  mockMinuteInMs,
} from '../../utils/order-time';
import styles from './order-details.module.css';

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { FC, useEffect } from 'react';
import Loader from '../loader/loader';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';
import { useGetOrderQuery } from '../../services/api/order-api/order-api';
import { useTypedSelector } from '../../utils/typed-hooks';

type OrderDetailsProps = {
  isPrivateOrders?: boolean;
};

const OrderDetails: FC<OrderDetailsProps> = ({ isPrivateOrders = false }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { number } = params;
  const parsedNumber = number ? Number.parseInt(number) : undefined;
  const { data: ingredientsResponse } = useGetIngredientsQuery(undefined);
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrderQuery(parsedNumber);
  const exactBurgerOrder = orderData?.orders?.[0];

  const socketData = useTypedSelector((state) => state.socket);

  const ingredientsData = ingredientsResponse?.data;

  const ordersData = isPrivateOrders ? socketData.privateData : socketData.data;

  const order =
    ordersData?.orders?.find((item: Order) => item.number === parsedNumber) ||
    exactBurgerOrder;
  useEffect(() => {
    dispatch(startSocket());

    return () => {
      dispatch(stopSocket());
    };
  }, [dispatch]);

  if (
    socketData.isLoading ||
    !socketData.isSocketOpen ||
    !ingredientsResponse ||
    isLoading
  ) {
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

  const estimatedCookingTimeMinutes =
    order.estimatedCookingTimeMinutes ??
    (ingredientsData
      ? estimateCookingTimeMinutes(order.ingredients, ingredientsData)
      : undefined);

  const estimatedReadyAt =
    order.estimatedReadyAt ??
    (estimatedCookingTimeMinutes
      ? new Date(
          new Date(order.createdAt).getTime() +
            estimatedCookingTimeMinutes * mockMinuteInMs
        ).toISOString()
      : undefined);

  const estimatedReadyAtTime =
    estimatedReadyAt &&
    new Date(estimatedReadyAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const estimatedSeconds =
    estimatedCookingTimeMinutes !== undefined
      ? convertEstimatedMinutesToSeconds(
          estimatedCookingTimeMinutes,
          mockMinuteInMs
        )
      : undefined;

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
      {estimatedSeconds !== undefined && (
        <p className="text text_type_main-default text_color_inactive mb-6">
          Estimated cooking time: ~{estimatedSeconds} sec
          {estimatedReadyAtTime
            ? ` (ready around ${estimatedReadyAtTime})`
            : ''}
        </p>
      )}

      <h3 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Ingredients:{' '}
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
