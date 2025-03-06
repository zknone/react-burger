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
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
            </ul>
          </div>
          <div>
            <h3 className="text text_type_main-medium">В работе</h3>
            <ul className={styles.orderTitlesList}>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
            </ul>
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <span className="text text_type_main-medium">
            Выполнено за все время:
          </span>
          <h2 className="text text_type_digits-large">28 752</h2>
        </div>
        <div className={styles.infoWrapper}>
          <span className="text text_type_main-medium">
            Выполнено за сегодня:
          </span>
          <h2 className="text text_type_digits-large">138</h2>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
