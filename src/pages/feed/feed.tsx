import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import styles from './feed.module.css';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';
import Loader from '../../components/loader/laoder';
import { STATUSES } from '../../consts';

function FeedPage() {
  const dispatch = useDispatch();
  const { data, isSocketOpen, isLoading } = useSelector(
    (state: RootState) => state.socket
  );

  useEffect(() => {
    dispatch(startSocket());

    return () => {
      dispatch(stopSocket());
    };
  }, [dispatch]);

  if (isLoading || !isSocketOpen || !data) {
    return <Loader />;
  }

  const finishedOrders = data?.orders.filter((item) => item.status === 'done');
  const pendingOrders = data?.orders.filter(
    (item) => item.status === 'pending'
  );

  return (
    <div className={styles.container}>
      <div className={styles.orders_wrapper}>
        <h3 className="text text_type_main-large">Лента заказов</h3>
        <ul className={styles.order_list}>
          {data.orders.map((item) => (
            <OrderItem key={item._id} {...item} />
          ))}
        </ul>
      </div>

      <div className={styles.data_wrapper}>
        <div className={styles.orders_titles_wrapper}>
          <div>
            <h3 className="text text_type_main-medium">Готовы</h3>
            <ul className={styles.order_titles_list}>
              {finishedOrders.map((item) => (
                <li
                  className="text text_type_digits-default"
                  style={{ color: STATUSES[item.status].color }}
                >{`#${item.number}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text text_type_main-medium">В работе</h3>
            <ul className={styles.order_titles_list}>
              {pendingOrders.map((item) => (
                <li
                  className="text text_type_digits-default"
                  key={item.number}
                >{`#${item.number}`}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.info_wrapper}>
          <span className="text text_type_main-medium">
            Выполнено за все время:
          </span>
          <h2 className="text text_type_digits-large">{data.total}</h2>
        </div>
        <div className={styles.info_wrapper}>
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
