import { useDispatch } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import styles from './feed.module.css';
import { useEffect } from 'react';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';
import Loader from '../../components/loader/loader';
import { STATUSES } from '../../consts';
import { useTypedSelector } from '../../utils/typed-hooks';

function FeedPage() {
  const dispatch = useDispatch();
  const { data, isSocketOpen, isLoading } = useTypedSelector(
    (state) => state.socket
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
        <h2 className="text text_type_main-large">Order Feed</h2>
        <ul className={styles.order_list}>
          {data.orders.map((item) => (
            <OrderItem key={item._id} {...item} />
          ))}
        </ul>
      </div>

      <div className={styles.data_wrapper}>
        <div className={styles.orders_titles_wrapper}>
          <div>
            <h3 className="text text_type_main-medium">Ready</h3>
            <ul className={styles.order_titles_list}>
              {finishedOrders.map((item) => (
                <li
                  key={item._id}
                  className="text text_type_digits-default"
                  style={{ color: STATUSES[item.status].color }}
                >{`#${item.number}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text text_type_main-medium">In Progress</h3>
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
            Completed all time:
          </span>
          <h3 className="text text_type_digits-large">{data.total}</h3>
        </div>
        <div className={styles.info_wrapper}>
          <span className="text text_type_main-medium">Completed today:</span>
          <h2 className="text text_type_digits-large">{data.totalToday}</h2>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
