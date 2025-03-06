import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/reel-item/order-item';
import styles from './feed.module.css';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';

function FeedPage() {
  const dispatch = useDispatch();
  const { data, isSocketOpen, error, isLoading } = useSelector(
    (state: RootState) => state.socket
  );

  console.log(data, error, isSocketOpen, isLoading);

  const finishedOrders = data.orders.filter((item) => item.status === 'done');
  const pendingOrders = data.orders.filter((item) => item.status === 'pending');

  useEffect(() => {
    dispatch(startSocket());

    return () => {
      dispatch(stopSocket());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.ordersWrapper}>
        <h3 className="text text_type_main-large">Лента заказов</h3>
        <ul className={styles.orderList}>
          {data.orders.map((item) => (
            <OrderItem key={item._id} {...item} />
          ))}
        </ul>
      </div>

      <div className={styles.dataWrapper}>
        <div className={styles.ordersTitlesWrapper}>
          <div>
            <h3 className="text text_type_main-medium">Готовы</h3>
            <ul className={styles.orderTitlesList}>
              {finishedOrders.map((item) => (
                <li className="text text_type_main-default">{`#${item.number}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text text_type_main-medium">В работе</h3>
            <ul className={styles.orderTitlesList}>
              {pendingOrders.map((item) => (
                <li className="text text_type_main-default">{`#${item.number}`}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <span className="text text_type_main-medium">
            Выполнено за все время:
          </span>
          <h2 className="text text_type_digits-large">{data.total}</h2>
        </div>
        <div className={styles.infoWrapper}>
          <span className="text text_type_main-medium">
            Выполнено за сегодня:
          </span>
          <h2 className="text text_type_digits-large">{data.totalToday}</h2>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
